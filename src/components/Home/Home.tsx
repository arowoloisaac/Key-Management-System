import "bootstrap/js/src/collapse.js";
import "bootstrap/js/src/dropdown.js";
import "../CSS/Home.css";
import Axios from "axios";
import { useEffect, useState } from "react";

export interface IKeys {
  id: string;
  room: string;
  status: string;
}

const Home = () => {
  const [getKeys, setKeys] = useState<IKeys[]>([]);

  useEffect(() => {
    Axios.get("https://localhost:7267/api/get-keys").then(response => setKeys(response.data));
  }, []);

  

  console.log(getKeys);

  return (
    <>
      <div></div>
      {/* {getKeys?.map((key) => {
        {key.id}
      })} */}

      <div className="home-search">
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <span>Filter for key</span>
            <div className="dropdown edit-dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Filter Key
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Available
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Unavailable
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    PendingRequest
                  </a>
                </li>
              </ul>
            </div>
            <form className="d-flex" role="search">
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </nav>
      </div>
      <div className="key-list">
        <div className="container">
          <div className="row" id="rows-style">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
