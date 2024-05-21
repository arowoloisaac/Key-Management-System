import { useEffect, useState } from "react";
import Axios from "axios";

export interface KeyWith {
  roomNumber: string;
  collectionTime: string;
  activity: string;
}

const With = () => {
  const [getWith, setWith] = useState<KeyWith>();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          "https://localhost:7267/api/with-you",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;

        setWith(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <>
      <div className="container" id="page">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-2 mb-3">
              
            </div>
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
                      {getWith?.collectionTime.slice(0, 10)}
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
                  <div className="row text-end">
                    <div className="col-sm-12">
                        <button className="btn btn-danger ">Return Key</button>
                    </div>
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
