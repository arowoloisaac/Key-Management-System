import { useState } from "react";
import "../CSS/Signup.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Home from "../Home/Home";

export interface ApiResponse {
  token: string;
}

const Signup = () => {
  const navigate = useNavigate();

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [pNumber, setPNumber] = useState("");
  //const [faculty, setFaculty] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState(0);

  const data = {
    firstName: fName,
    lastName: lName,
    email: email,
    phoneNumber: pNumber,
    password: password,
  };

  console.log(data);
  const register = () => {
    Axios.post<ApiResponse>(
      "https://localhost:7267/api/register-collector",
      data
    ).then((res) => {
      setStatus(res.status);
      localStorage.setItem("token", res.data.token);
      console.log(res.data.token);
      navigate("/");
      window.location.reload();
    });
  };
  return (
    <>
      {status === 200 ? (
        <Home />
      ) : (
        <div className="container-fluid" id="signup-container">
          <h1 className="h3 mb-3 fw-normal">Sign Up</h1>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <div className="col col-lg-3"></div>
            <div className="col col-lg-6">
              <div className="user-form card border-white">
                <div className="form-signin w-100 m-auto">
                  <form>
                    <div
                      className="form-floating"
                      style={{ paddingBottom: "15px" }}
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="John"
                        onChange={(opt) => setFName(opt.target.value)}
                      />
                      <label>First Name</label>
                    </div>

                    <div
                      className="form-floating"
                      style={{ paddingBottom: "15px" }}
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Doe"
                        onChange={(opt) => setLName(opt.target.value)}
                      />
                      <label>Last Name</label>
                    </div>

                    <div
                      className="form-floating"
                      style={{ paddingBottom: "15px" }}
                    >
                      <input
                        type="tel"
                        minLength={11}
                        maxLength={12}
                        className="form-control"
                        placeholder="+7(9xx)-xxx-xx-xx"
                        onChange={(opt) => setPNumber(opt.target.value)}
                      />
                      <label>Phone Number</label>
                    </div>

                    {/* <div
                    className="form-floating"
                    style={{ paddingBottom: "15px" }}
                  >
                    <input
                      type="text"
                      className="form-control"
                      placeholder="HITs"
                    />
                    <label>Faculty</label>
                  </div> */}

                    <div
                      className="form-floating"
                      style={{ paddingBottom: "15px" }}
                    >
                      <input
                        type="email"
                        className="form-control"
                        placeholder="name@example.com"
                        onChange={(opt) => setEmail(opt.target.value)}
                      />
                      <label>Email address</label>
                      <div style={{ fontSize: "10px" }}>
                        Email will be used for login
                      </div>
                    </div>

                    <div
                      className="form-floating"
                      style={{ paddingBottom: "15px" }}
                    >
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={(opt) => setPassword(opt.target.value)}
                      />
                      <label>Password</label>
                    </div>
                  </form>
                  <button
                    className="btn btn-primary py-2"
                    type="submit"
                    onClick={register}
                  >
                    Sign up
                  </button>
                  <p className="mt-5 mb-3 text-body-secondary">&copy; 2024</p>
                </div>
              </div>
            </div>
            <div className="col col-lg-3"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;


{/* <div className="col-md-8 col-6">
  <input
    type="text"
    className="form-control"
    onChange={(event) => {
      setFName(event.target.value);
      setError("");
    }}
    required
    onBlur={() => {
      !getFName?.trim() ? setError("first name cannot be empty") : setError("");
    }}
    placeholder={getProfile?.firstName}
  />
  {error && <div id="error-message">{error}</div>}
</div>; */}