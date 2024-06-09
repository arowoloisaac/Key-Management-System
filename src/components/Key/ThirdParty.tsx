import { useEffect, useState } from "react";
import { IKeys } from "../Home/Home";
import Axios from "axios";
import { ApiURL, Token } from "../../App";

const ThirdParty = () => {
  const [getKeys, setKeys] = useState<IKeys[]>([]);

  const [activities, setActivities] = useState<{ [key: string]: string }>({});
  const [activitySelected, setActivitySelected] = useState<{
    [key: string]: boolean;
  }>({});

  //handle the changes and buttons relating to the specific target
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

  // get the unavailable keys
  const unavailableKeys = () => {
    Axios.get(`${ApiURL}/get-keys?key=Unavailable`).then(
      (res) => {
        setKeys(res.data);
      }
    );
  };

  //handle thirdparty request
  const handleRequest = (key: any) => {
    let getActivity = activities[key.id];

    Axios.post(
      `${ApiURL}/Send-request?keyId=${key.id}&activity=${getActivity}`,
      {},
      { headers: { Authorization: `Bearer ${Token}` } }
    )
      .then((res) => {
        if (res.status === 200) {
          alert(res.data);
          location.reload();
        }
      })
      .catch((ex) => {
        ex.message;
      });
  };

  useEffect(() => {
    handleActivityChange;
    unavailableKeys();
  }, []);

  return (
    <>
      <div style={{ paddingTop: "40px" }}>
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
                  <select
                    className="form-select form-select-sm"
                    onChange={(event) =>
                      handleActivityChange(key.id, event.target.value)
                    }
                    value={activities[key.id]}
                  >
                    <option disabled selected>
                      Activities
                    </option>
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
                    disabled={!activitySelected[key.id]}
                    onClick={() => handleRequest(key)}
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
