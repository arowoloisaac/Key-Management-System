import Axios from "axios";
import { IKeys } from "../Home/Home";
import { useEffect, useState } from "react";

const UnfilteredKey = () => {

    const [getKeys, setKeys] = useState<IKeys[]>([])
    useEffect(() => {
        Axios.get("https://localhost:7267/api/get-keys").then((response) =>
          setKeys(response.data)
        );
    }, [])
    return (
      <>
        {getKeys.map((key) => (
          <div key={key.id} className="row" id="rows-style"> 
            <div className="col-5 col-lg-6 col-sm-4">{key.room}</div>
            <div key={key.status} className="col-4 col-lg-2 col-sm-3" id="activity-selector" style={{textAlign:"end"}}>
              {key.status === "Available" ? (
                <button
                  className="btn btn-primary btn-sm"
                  type="button"
                >
                  Available
                </button>
              ) : key.status === "Unavailable" ? (
                <button
                  className="btn btn-secondary btn-sm"
                  type="button"
                >
                  Engaged
                </button>
              ) : (
                <button
                  className="btn btn-secondary btn-sm"
                  type="button"
                >
                  Pending
                </button>
              )}
            </div>
            
            <div className="col-3 col-lg-2 col-sm-3">
              <button className="btn btn-sm btn-primary" type="button">
                Request
              </button>
            </div>
          </div>
        ))}
      </>
    );
}

export default UnfilteredKey;