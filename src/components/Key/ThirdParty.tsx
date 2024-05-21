import { useEffect, useState } from "react";
import { IKeys } from "../Home/Home";
import Axios from "axios";

const ThirdParty = () => {
  const [getKeys, setKeys] = useState<IKeys[]>([]);

  useEffect(() => {
    Axios.get("https://localhost:7267/api/get-keys?key=Unavailable").then(
      (res) => {
        setKeys(res.data);
      }
    );
  }, []);

  console.log(getKeys);

  return (
    <>
      <div>
        <div className="container">
          {getKeys.length > 0 ? (
            getKeys.map((key) => (
              <div className="row" id="rows-style" key={key.id}>
                <div
                  className="col-4 col-lg-6 col-sm-4"
                  id="room"
                  style={{
                    textAlign: "start",
                    fontSize: "15px",
                    color: "blue",
                  }}
                >
                  {key.room}
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
                Probably all keys are in board
              </p>
              <p style={{ color: "blue", fontSize: "20px" }}>
                Try request a key instead 🤔🤔
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ThirdParty;
