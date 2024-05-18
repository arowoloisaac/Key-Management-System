import { useEffect, useState } from "react";
import Axios from "axios";
import { User } from "./ViewProfile";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {

  const [getFName, setFName] = useState<string>();
  const [getLName, setLName] = useState<string>();
  const [getNumber, setNumber] = useState<string>();

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [getProfile, setProfile] = useState<User>();

  useEffect(() => {
    Axios.get("https://localhost:7267/api/profile", {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((res) => {
        setProfile(res.data);
      })
      .catch((ex) => ex.message);
  }, [token]);

  const data = {
    firstName: getFName || getProfile?.firstName,
    lastName: getLName || getProfile?.lastName,
    phoneNumber: getNumber || getProfile?.phoneNumber,
  };

  useEffect(() => {
    console.log(data);
    console.log(getProfile?.firstName)
  },[data, getProfile]);

  const updateProfileButton = () => {
    Axios.put("https://localhost:7267/api/profile", data, {
      headers: { Authorization: `bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 200) {
          navigate("/profile");
          location.reload();
        }
      })
      .catch((ex) => {
        if (ex.response.status) {
          alert(ex.message);
        }
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
                                setFName(event.target.value);
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
                          {/* <div className="col-md-8 col-6">{getProfile?.birthDate.split('T')[0]}</div> */}
                          <div className="col-md-8 col-6">
                            <input
                              type="text"
                              className="form-control"
                              onChange={(event) => {
                                setLName(event.target.value);
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
                                setNumber(event.target.value);
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
