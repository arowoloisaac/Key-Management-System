import { useEffect, useState } from "react";
import Axios from "axios";
import { IKeys } from "../Home/Home";
import "../../assets/CSS/RequestKey.css";
import { ApiURL, Token } from "../../App";

const RequestKey = () => {
  const [getKeys, setKeys] = useState<IKeys[]>([]);

   const [activities, setActivities] = useState<{ [key: string]: string }>({});
   const [activitySelected, setActivitySelected] = useState<{
     [key: string]: boolean;
   }>({});


  const handleActivityChange = (keyId: string, activity: string) => {
    setActivities((prevRoles) => ({
      ...prevRoles,
      [keyId]: activity,
    }));

    //get the selected activity
    setActivitySelected((prevRoleSelected) => ({
      ...prevRoleSelected,
      [keyId]: true,
    }));
  };
  
  useEffect(() => {
    Axios.get(`${ApiURL}/get-keys?key=Available`).then(
      (res) => {
        setKeys(res.data);
      }
    );
  }, []);

  const handleRequest = (key: any) => {
    var room = key.id;
    let getActivity = activities[key.id]
    const Api = `${ApiURL}/collect-key?keyId=${room}&activity=${getActivity}`;
    console.log(Api);
    Axios.post(Api, {}, { headers: { Authorization: `bearer ${Token}` } })
      .then((res) => {
        console.log(res.data);
        alert("Request Sent, await your response!");
      })
      .catch((ex) => {
        alert(ex.message);
      });
  };

  return (
    <>
      <div>
        <span style={{ padding: "10px" }}>
          It is required to select an activity to perform
        </span>
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
                <div
                  className="col-4 col-lg-2 col-sm-3"
                  id="key-selector"
                  aria-required
                >
                  <select
                    className="form-select form-select-sm"
                    onClick={(event: any) => {
                      handleActivityChange(key.id, event.target.value)
                      // setActivity(event.target.value);
                    }}
                  >
                    <option disabled selected>Activity</option>
                    <option>Lecture</option>
                    <option>Seminar</option>
                    <option>Study</option>
                    <option>Repair</option>
                    <option value="OffSchedule">Others</option>
                  </select>
                </div>
                <div className="col-3 col-lg-2 col-sm-3" id="key-request">
                  <button
                    className="btn btn-sm btn-primary"
                    type="button"
                    onClick={() => handleRequest(key)}
                    disabled={!activitySelected[key.id]}
                  >
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
                No classroom is available at the moment
              </p>
              <p style={{ color: "blue", fontSize: "20px" }}>
                Attempt again soon!!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RequestKey;
