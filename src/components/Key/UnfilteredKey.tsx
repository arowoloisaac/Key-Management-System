import Axios from "axios";
import { IKeys } from "../Home/Home";
import { useEffect, useState } from "react";

const UnfilteredKey = () => {
  const [getKeys, setKeys] = useState<IKeys[]>([]);
  useEffect(() => {
    Axios.get("https://localhost:7267/api/get-keys").then((response) =>
      setKeys(response.data)
    );
  }, []);
  return (
    <>
      {getKeys.map((key) => (
        <div key={key.id} className="col-sm-4 mb-3 mb-sm-0">
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
      ))}
    </>
  );
};

export default UnfilteredKey;
