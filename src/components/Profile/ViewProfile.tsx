import { useEffect, useState } from "react";
import Axios from "axios";
import "../CSS/profileCSS/view.css";

export interface User {
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string
}

const ViewProfile = () => {
  const token = localStorage.getItem("token");

  const [getProfile, setProfile] = useState<User>();
  useEffect(() => {
    Axios.get("https://localhost:7267/api/profile", {
      headers: {
        Authorization: `bearer ${token}`,
      },
    }).then((res) => {
      setProfile(res.data)
    }).catch(ex => ex.message);
  }, []);

  return (
    <>
      <div></div>
      <div className="container" id="page">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt=""
                      id="img-size"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">First Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{getProfile?.firstName === "" ? "no name inputted": getProfile?.firstName}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Last Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {getProfile?.lastName}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{getProfile?.email}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {getProfile?.phoneNumber}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12">
                      <a className="btn btn-info " href="/edit-profile">
                        Edit
                      </a>
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

export default ViewProfile;
