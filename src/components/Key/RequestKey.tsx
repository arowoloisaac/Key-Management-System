import { useEffect, useState } from "react";
import Axios from "axios";
import { IKeys } from "../Home/Home";
import "../CSS/RequestKey.css";

const RequestKey = () => {
  const [getKeys, setKeys] = useState<IKeys>();

  useEffect(() => {
    Axios.get("").then((res) => {
      setKeys(res.data);
    });
  });
  return (
    <>
      <div>
        <div className="container">
          <div className="row" id="rows-style">
            <div
              className="col-5 col-lg-6 col-sm-4"
              id="room"
              style={{ textAlign: "start", fontSize: "15px", color: "blue" }}
            >
              Room 202
            </div>
            <div className="col-4 col-lg-2 col-sm-3" id="key-selector">
              <select className="form-select form-select-sm">
                <option selected>Lecture</option>
                <option>Seminar</option>
                <option>Study</option>
                <option>Repair</option>
              </select>
            </div>
            <div className="col-3 col-lg-2 col-sm-3" id="key-request">
              <button className="btn btn-sm btn-primary" type="button">
                Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestKey;
