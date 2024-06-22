import { useState } from "react";
import "../../assets/CSS/Signup.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Home from "../Home/Home";
import { ApiURL, errorMessage } from "../../App";

export interface ApiResponse {
  token: string;
}

const Signup = () => {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [firstnameFocused, setfirstnameFocused] = useState(false);
  const [lastnameFocused, setlastnameFocused] = useState(false);
  const [pNumberFocused, setPNumberFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [status, setStatus] = useState(0);

  const data = {
    firstName: firstname,
    lastName: lastname,
    email: email,
    phoneNumber: PhoneNumber,
    password: password,
  };

  const register = () => {
    Axios.post<ApiResponse>(`${ApiURL}/register-collector`, data)
      .then((res) => {
        setStatus(res.status);
        localStorage.setItem("token", res.data.token);
        console.log(res.data.token);
        navigate("/");
        window.location.reload();
      })
      .catch((ex) => alert(errorMessage(ex)));
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
                        onChange={(opt) => setFirstname(opt.target.value)}
                        onFocus={() => setfirstnameFocused(true)}
                        onBlur={() => setfirstnameFocused(false)}
                        required
                      />
                      <label>First Name</label>
                      {firstname.trim() === "" && firstnameFocused && (
                        <span className="text-danger">
                          First name is required
                        </span>
                      )}
                    </div>

                    <div
                      className="form-floating"
                      style={{ paddingBottom: "15px" }}
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Doe"
                        onChange={(opt) => setLastname(opt.target.value)}
                        required
                        onFocus={() => setlastnameFocused(true)}
                        onBlur={() => setlastnameFocused(false)}
                      />
                      <label>Last Name</label>
                      {lastname.trim() === "" && lastnameFocused && (
                        <span className="text-danger">
                          Last name is required
                        </span>
                      )}
                    </div>

                    <div
                      className="form-floating"
                      style={{ paddingBottom: "15px" }}
                    >
                      <input
                        type="tel"
                        minLength={11}
                        maxLength={14}
                        className="form-control"
                        placeholder="+7(9xx)-xxx-xx-xx"
                        onChange={(opt) => setPhoneNumber(opt.target.value)}
                        required
                        onFocus={() => setPNumberFocused(true)}
                        onBlur={() => setPNumberFocused(false)}
                      />
                      <label>Phone Number</label>
                      {PhoneNumber.trim() === "" && pNumberFocused && (
                        <span className="text-danger">
                          Phone number is required
                        </span>
                      )}
                    </div>

                    <div
                      className="form-floating"
                      style={{ paddingBottom: "15px" }}
                    >
                      <input
                        type="email"
                        className="form-control"
                        placeholder="name@example.com"
                        onChange={(opt) => setEmail(opt.target.value)}
                        required
                        onFocus={() => setEmailFocused(true)}
                        onBlur={() => setEmailFocused(false)}
                      />
                      <label>Email address</label>
                      {email.trim() === "" && emailFocused && (
                        <span className="text-danger">
                          Email address is required
                        </span>
                      )}
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
                        required
                        minLength={6}
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                      />
                      <label>Password</label>
                      {password.trim() === "" && passwordFocused && (
                        <span className="text-danger">
                          Password is required
                        </span>
                      )}
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