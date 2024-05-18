import "bootstrap/js/src/collapse.js";
import "bootstrap/js/src/dropdown.js";
import "../CSS/Home.css";
import Axios from "axios";
import { useEffect, useState } from "react";
import UnfilteredKey from "../Key/UnfilteredKey";
import Key from "../Key/Key";

export interface IKeys {
  id: string;
  room: string;
  status: string;
}

const Home = () => {
  const [getKeys, setKeys] = useState<IKeys[]>([]);
  const [getSelector, setSelector] = useState<any>();
  //const [getFilter, setFilter] = useState<any>();
  const [isClicked, setIsClicked] = useState(false);

  const handleSelector = (event: any) => {
    setSelector(event.target.value);
  };

  const handleFilter = (event: any) => {
    event.preventDefault();
    setIsClicked(true);
    var parameter = `https://localhost:7267/api/get-keys?key=${getSelector}`;

    Axios.get(parameter).then((response) => {
      setKeys(response.data);
    });
  };

  

  return (
    <>
      <div className="home-search">
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <span>Filter for key</span>
            <div className="edit-select">
              <select className="form-select" id="" onClick={handleSelector}>
                <option value="options" disabled>
                  Filter Key
                </option>
                <option value="Available">Available</option>
                <option value="Unavailable">Engaged</option>
                <option value="PendingAcceptance">Pending</option>
              </select>
            </div>

            <form className="d-flex" role="search">
              <button
                className="btn btn-outline-success"
                type="submit"
                onClick={handleFilter}
              >
                Search
              </button>
            </form>
          </div>
        </nav>
      </div>
      <div className="key-list">
        <div className="container">
          {!isClicked ? (
            <Key />
          ) : isClicked && getKeys.length > 0 ? (
            getKeys.map((key) => (
              <div key={key.id} className="row" id="rows-style">
                <div className="col-4 col-lg-6 col-sm-4">{key.room}</div>
                <div
                  key={key.status}
                  className="col-3 col-lg-2 col-sm-3"
                  id="activity-selector"
                >
                  {key.status === "Available" ? (
                    <button className="btn btn-primary btn-sm" type="button">
                      Available
                    </button>
                  ) : key.status === "Unavailable" ? (
                    <button className="btn btn-secondary btn-sm" type="button">
                      Engaged
                    </button>
                  ) : (
                    <button className="btn btn-secondary btn-sm" type="button">
                      Pending
                    </button>
                  )}
                </div>
                <div className="col-3 col-lg-2 col-sm-3">
                  <select
                    className="form-select form-select-sm"
                    aria-label="Default select example"
                  >
                    <option selected>Lecture</option>
                    <option>Seminar</option>
                    <option>Study</option>
                    <option>Repair</option>
                  </select>
                </div>
                <div className="col-2 col-lg-2 col-sm-3">
                  <button className="btn btn-sm btn-primary" type="button">
                    Request
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center" style={{paddingTop:"100px"}}>
              <h1>OOPs</h1>
              <p style={{color:"darkblue", fontSize:"18px", textAlign:"center"}}>No classroom with a pending request</p>
              <p style={{color: "blue", fontSize:"20px"}}>Hurray!!, request a key now</p>
            </div>
          )}
          {/* <Key /> */}
        </div>
      </div>
    </>
  );
};

export default Home;

{
  /* <div className="row" id="rows-style">
            <div className="col-4 col-lg-6 col-sm-4">Room 202</div>
            <div className="col-3 col-lg-2 col-sm-3" id="activity-selector">
              <button className="btn btn-primary btn-sm" type="button">
                Available
              </button>
            </div>
            <div className="col-3 col-lg-2 col-sm-3">
              <select
                className="form-select form-select-sm"
                aria-label="Default select example"
              >
                <option selected>Lecture</option>
                <option>Seminar</option>
                <option>Study</option>
                <option>Repair</option>
              </select>
            </div>
            <div className="col-2 col-lg-2 col-sm-3">
              <button className="btn btn-sm btn-primary" type="button">
                Request
              </button>
            </div>
          </div>

          <div className="row" id="rows-style">
            <div className="col-4 col-lg-6 col-sm-4">Room 205</div>
            <div className="col-3 col-lg-2 col-sm-3" id="activity-selector">
              <button className="btn btn-secondary btn-sm" type="button">
                Engaged
              </button>
            </div>
            <div className="col-3 col-lg-2 col-sm-3">
              <select
                className="form-select form-select-sm"
                aria-label="Default select example"
              >
                <option selected>Lecture</option>
                <option>Seminar</option>
                <option>Study</option>
                <option>Repair</option>
              </select>
            </div>
            <div className="col-2 col-lg-2 col-sm-3">
              <button className="btn btn-sm btn-info" type="button">
                Request
              </button>
            </div>
          </div>

          <div className="row" id="rows-style">
            <div className="col-4 col-lg-6 col-sm-4">Room 203</div>
            <div className="col-3 col-lg-2 col-sm-3" id="activity-selector">
              <button className="btn btn-secondary btn-sm" type="button">
                Pending
              </button>
            </div>
            <div className="col-3 col-lg-2 col-sm-3">
              <select
                className="form-select form-select-sm"
                aria-label="Default select example"
              >
                <option selected>Lecture</option>
                <option>Seminar</option>
                <option>Study</option>
                <option>Repair</option>
              </select>
            </div>
            <div className="col-2 col-lg-2 col-sm-3">
              <button
                className="btn btn-sm btn-info btn-disabled"
                type="button"
              >
                Request
              </button>
            </div>
          </div> */
}
