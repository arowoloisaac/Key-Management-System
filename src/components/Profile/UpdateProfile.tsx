import { useEffect, useState } from "react";
import Axios from "axios";
import { User } from "./ViewProfile";
import { useNavigate } from "react-router-dom";
import { ApiURL, Token, errorMessage } from "../../App";

const UpdateProfile = () => {
  const [firstname, setFirstname] = useState<string>();
  const [lastname, setLastname] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
    const [getProfile, setProfile] = useState<User>();

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`${ApiURL}/profile`, {
      headers: {
        Authorization: `bearer ${Token}`,
      },
    })
      .then((res) => {
        setProfile(res.data);
      })
      .catch((ex) => ex.message);
  }, [Token]);

  const data = {
    firstName: firstname || getProfile?.firstName,
    lastName: lastname || getProfile?.lastName,
    phoneNumber: phoneNumber || getProfile?.phoneNumber,
  };

  const updateProfileButton = () => {
    Axios.put(`${ApiURL}/profile`, data, {
      headers: { Authorization: `bearer ${Token}` },
    })
      .then((res) => {
        if (res.status === 200) {
          navigate("/profile");
          location.reload();
        }
      })
      .catch((ex) => {
          alert(errorMessage(ex));
        
      });
  };

  return (
    <>
      <div className="container" id="edit-container">
        <div className="row">
          <div className="col-12">
            <div style={{ paddingTop: "50px" }} className="">
              <div className="card-body">
                <div className="row">
                  <div className="col-12">
                    <div className="tab-content ml-1" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="basicInfo"
                        role="tabpanel"
                        aria-labelledby="basicInfo-tab"
                      >
                        <div className="row">
                          <div className="col-sm-3 col-md-2 col-5">
                            <label>First Name</label>
                          </div>
                          <div className="col-md-8 col-6">
                            <input
                              type="text"
                              className="form-control"
                              onChange={(event) => {
                                setFirstname(event.target.value);
                              }}
                              required
                              placeholder={getProfile?.firstName}
                            />
                          </div>
                        </div>
                        <hr />

                        <div className="row">
                          <div className="col-sm-3 col-md-2 col-5">
                            <label>Last Name</label>
                          </div>
                          <div className="col-md-8 col-6">
                            <input
                              type="text"
                              className="form-control"
                              onChange={(event) => {
                                setLastname(event.target.value);
                              }}
                              placeholder={getProfile?.lastName}
                            />
                          </div>
                        </div>
                        <hr />

                        <div className="row">
                          <div className="col-sm-3 col-md-2 col-5">
                            <label>Email</label>
                          </div>
                          <div className="col-md-8 col-6">
                            {getProfile?.email}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3 col-md-2 col-5">
                            <label>Mobile</label>
                          </div>
                          <div className="col-md-8 col-6">
                            <input
                              type="tel"
                              className="form-control"
                              placeholder={getProfile?.phoneNumber}
                              onChange={(event) => {
                                setPhoneNumber(event.target.value);
                              }}
                              maxLength={14}
                            />
                          </div>
                        </div>
                        <hr />
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "end" }}>
                  <button
                    className="btn btn-primary"
                    onClick={updateProfileButton}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
