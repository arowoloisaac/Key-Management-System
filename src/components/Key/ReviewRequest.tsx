import { useEffect, useState } from "react";
import Axios from "axios";
import { ApiURL, Token, errorMessage } from "../../App";

export interface IThirdPartyKey {
  keyId: string;
  name: string;
}

const ReviewRequest = () => {
  const [key, setKey] = useState<IThirdPartyKey>();

  const [hasNotification, setHasNotification] = useState<boolean>(false);

  const getKey = () => {
    Axios.get(`${ApiURL}/get-request`, {
      headers: { Authorization: `Bearer ${Token}` },
    })
      .then((res) => {
        setKey(res.data);
      })
      .catch((ex) => alert(errorMessage(ex)));
  };

  //returns boolean
  const getNotification = () => {
    Axios.get(`${ApiURL}/get-notifier`, {
      headers: { Authorization: `Bearer ${Token}` },
    }).then((res) => {
      setHasNotification(res.data);
    });
  };

  //handle accept btn
  const handleAccept = (key: any) => {
    const keyId = key.id;
    Axios.put(
      `${ApiURL}/accept-request?keyId=${keyId}`,
      {},
      { headers: { Authorization: `Bearer ${Token}` } }
    )
      .then((res) => {
        alert(res.data.text);
        location.reload();
      })
      .catch((ex) => alert(errorMessage(ex)));
  };

  //handle reject button
  const handleReject = (key: any) => {
    const keyId = key.id;
    Axios.put(
      `${ApiURL}/reject-request?keyId=${keyId}`,
      {},
      { headers: { Authorization: `Bearer ${Token}` } }
    )
      .then((res) => {
        alert(res.data);
        location.reload();
      })
      .catch((ex) => alert(errorMessage(ex)));
  };

  useEffect(() => {
    getKey();
    getNotification();
  }, []);

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
