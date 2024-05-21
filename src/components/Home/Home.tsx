import "bootstrap/js/src/collapse.js";
import "bootstrap/js/src/dropdown.js";
import "../CSS/Home.css";
import Axios from "axios";
import { useState } from "react";
import "../CSS/RequestKey.css";
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

{
  /* <div>
  <div className="row">
    <div className="col-lg-6">
      <div className="row">
        <div className="col-lg-6">bob</div>
        <div className="col-lg-6">bob</div>
        <div className="col-lg-6">bob</div>
        <div className="col-lg-6">bob</div>
      </div>
    </div>
  </div>
</div>; */
}

{/* <div key={key.id} className="row" id="rows-style">
  <div className="col-4 col-lg-6 col-sm-4">{key.room}</div>
  <div className="col-3 col-lg-2 col-sm-3" id="key-selector"></div>
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

  <div className="col-2 col-lg-2 col-sm-2">
    {key.status === "Unavailable" ? (
      <a href="/thirdparty">
        <button className="btn btn-sm btn-primary" type="button">
          Request
        </button>
      </a>
    ) : key.status === "Available" ? (
      <a href="/request">
        <button className="btn btn-sm btn-primary" type="button">
          Request
        </button>
      </a>
    ) : (
      <a href="">
        <span>Await</span>
      </a>
    )}
  </div>
</div>; */}


 {
   /* <div className="col-sm-4  mb-3 mb-sm-0">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-6">
                      <h5 className="card-title">Room 200</h5>
                    </div>
                    <div className="col-6">
                      <h5 className="" style={{ textAlign: "end" }}>
                        Engaged
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-4  mb-3 mb-sm-0">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-6">
                      <h5 className="card-title">Room 210</h5>
                    </div>
                    <div className="col-6">
                      <h5 className="" style={{ textAlign: "end" }}>
                        Available
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div> */
 }