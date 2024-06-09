import "bootstrap/js/src/collapse.js";
import "bootstrap/js/src/dropdown.js";
import "../../assets/CSS/Home.css"
import Axios from "axios";
import { useState } from "react";
import "../../assets/CSS/RequestKey.css";
import Key from "../Key/Key";
import { ApiURL } from "../../App";

export interface IKeys {
  id: string;
  room: string;
  status: string;
}

const Home = () => {
  const [getKeys, setKeys] = useState<IKeys[]>([]);
  const [getSelector, setSelector] = useState<any>();
  const [isClicked, setIsClicked] = useState(false);

  const handleSelector = (event: any) => {
    setSelector(event.target.value);
  };

  const handleFilter = (event: any) => {
    event.preventDefault();
    setIsClicked(true);
    var parameter = `${ApiURL}/get-keys?key=${getSelector}`;

    Axios.get(parameter).then((response) => {
      setKeys(response.data);
    });
  };

  return (
    <>
      <div className="key-list">
        <div className="container"></div>
      </div>

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
          <div className="row g-3" id="rows-style">
          {!isClicked || (isClicked && getSelector == null) ? (
            <Key />
          ) : isClicked && getKeys.length > 0 ? (
            getKeys.map((key) => (
                <div className="col-sm-4 mb-3 mb-sm-0">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-6">
                          <h5 className="card-title">{key.room}</h5>
                        </div>
                        <div className="col-6" style={{ textAlign: "end" }}>
                          {key.status === "Available" ? (
                            <h5>Available</h5>
                          ) : key.status === "Unavailable" ? (
                            <h5>Engaged</h5>
                          ) : (
                            <h5>Pending</h5>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            ))
          ) : (
            <div className="text-center" style={{ paddingTop: "100px" }}>
              <h1>OOPs</h1>
              <p
                style={{
                  color: "darkblue",
                  fontSize: "18px",
                  textAlign: "center",
                }}
              >
                No classroom with such scenario
              </p>
              <p style={{ color: "blue", fontSize: "20px" }}>
                Hurray!!, Try again later
              </p>
            </div>
          )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;