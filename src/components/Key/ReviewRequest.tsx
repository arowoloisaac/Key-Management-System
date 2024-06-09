import { useEffect, useState } from "react";
import Axios from "axios";

export interface IThirdPartyKey {
  keyId: string, name: string
}

const ReviewRequest = () => {
  const savedToken = localStorage.getItem("token");
  const [key, setKey] = useState<IThirdPartyKey>();

  const [hasNotification, setHasNotification] = useState<boolean>(false);

  const getKey = () => {
    Axios.get("https://localhost:7267/api/get-request", {
      headers: { Authorization: `Bearer ${savedToken}` },
    })
      .then((res) => {
        if (res.status === 200) {
          setKey(res.data);
        //   console.log(res.data);
        } else {
          alert("You don't have any notification");
        }
      })
      .catch((ex) => ex.message);
  };

  //returns boolean
  const getNotification = () => {
    Axios.get("https://localhost:7267/api/get-notifier", {
      headers: { Authorization: `Bearer ${savedToken}` },
    }).then((res) => {
      setHasNotification(res.data);
    });
  };

  //handle accept btn
  const handleAccept = (key: any) => {
    const keyId = key.id;
    Axios.put(
      `https://localhost:7267/api/accept-request?keyId=${keyId}`,
      {},
      { headers: { Authorization: `Bearer ${savedToken}` } }
    )
      .then((res) => {
        alert(res.data.text);
        location.reload()
      })
      .catch((ex) => alert(ex.message));
  };

  //handle reject button
  const handleReject = (key: any) => {
    const keyId = key.id;
    Axios.put(
      `https://localhost:7267/api/reject-request?keyId=${keyId}`,
      {},
      { headers: { Authorization: `Bearer ${savedToken}` } }
    )
      .then((res) => {
        alert(res.data.text)
        location.reload()
      })
      .catch((ex) => ex.message);
  };

  useEffect(() => {
    getKey();
    getNotification();
  }, []);

  console.log(key);
  return (
    <>
      <div>
        {!hasNotification ? (
          <div
            className="container text-center"
            style={{ paddingTop: "200px" }}
          >
            <div>
              <h2 style={{ color: "blueviolet", fontFamily: "revert" }}>
                No Request from Third party
              </h2>
            </div>
            <div>
              <p style={{ color: "blue" }}> 
                We will notify when there is a request👻👻!!!
              </p>
            </div>
          </div>
        ) : (
          <div>
            <span>This page aids key requests from the worker</span>
            <div id="externalContainer">
              <div className="container"> 
                  <div className="row">
                    <div className="col-6 col-sm-6" id="text-header">
                      <h5>{key?.name}</h5>
                    </div>

                    <div className="col-3 col-sm-3 text-end" id="accept-btn">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleAccept(key)}
                      >
                        Accept
                      </button>
                    </div>
                    <div className="col-3 col-sm-3">
                      <button
                        className="btn btn-danger"
                        onClick={() => handleReject(key)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
              
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewRequest;
