import { useEffect, useState } from "react";
import Axios from "axios";
import { ApiURL, Token, errorMessage } from "../../App";

export interface KeyWith {
  roomNumber: string;
  collectionTime: string;
  activity: string;
  status: string;
}

const With = () => {
  const [getWith, setWith] = useState<KeyWith>();

  const handleReturn = async () => {
    await Axios.put(
      `${ApiURL}/return-key`,
      {},
      { headers: { Authorization: `Bearer ${Token}` } }
    ).then((res) =>
      res.status === 200 ? alert(res.data) : alert("unable to return key")
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`${ApiURL}/with-you`, {
          headers: { Authorization: `Bearer ${Token}` },
        });
        const data = response.data;
        setWith(data);
      } catch (error) {
        alert(errorMessage(error));
      }
    };
    fetchData();
  }, [Token]);

  return (
    <>
      <div className="container" id="page">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-2 mb-3"></div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Room Number</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {getWith?.roomNumber}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Date</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {getWith?.collectionTime
                        .slice(0, 10)
                        .split("-")
                        .reverse()
                        .join("-")}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Time</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {getWith?.collectionTime.slice(11, 16)}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Activity</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {getWith?.activity}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    {getWith?.status === "Pending" ? (
                      <>
                        <div className="col-sm-3">
                          <h6 className="mb-0">Status</h6>
                        </div>
                        {/* note that the status will either be for request key
                        or returning key back to the worker */}
                        <div className="col-sm-9 text-secondary">
                          Awaiting Acceptance
                        </div>
                      </>
                    ) : (
                      // <div className="col-sm-12 text-start">
                      //   <span className="">Status - Assign or Return</span>
                      // </div>
                      <div className="col-sm-12 text-end">
                        <button
                          className="btn btn-danger"
                          onClick={handleReturn}
                        >
                          Return Key
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default With;
