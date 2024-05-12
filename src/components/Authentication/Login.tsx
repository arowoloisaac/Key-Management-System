import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [getEmail, setEMail] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getStatus, setStatus] = useState(0);

  //initial state to check for the token
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();

  const savedToken = localStorage.getItem("token");

  useEffect(() => {
    if (savedToken !== null) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  });

  const data = {
    email: getEmail,
    password: getPassword,
  };

  const handleLogin = (event: any) => {
    event.preventDefault();
    if (!isAuthenticated) {
      Axios.post("https://localhost:7267/api/login", data).then((res) => {
        res.data;

        setStatus(res.status);

        if (getStatus === 200) {
          localStorage.setItem("token", res.data.token);
          navigate("/");
          window.location.reload();
        } else {
          navigate("/login");
        }
      });
    } else {
      if (getStatus === 401 || getStatus === 403) {
        localStorage.clear();
        window.location.reload();
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="container-fluid">
          <section className="vh-100">
            <div className="container-fluid h-custom">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-9 col-lg-6 col-xl-5">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    className="img-fluid"
                    alt="Sample image"
                  />
                </div>
                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                  <form id="login-form">
                    <div className="divider d-flex align-items-center my-4">
                      <h4 className="text-center fw-bold mx-3 mb-0">Sign In</h4>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="email"
                        className="form-control form-control-lg"
                        placeholder="Enter a valid email address"
                        name="email"
                        onChange={(event) => setEMail(event.target.value)}
                      />
                      <label className="form-label">Email address</label>
                    </div>

                    <div className="form-outline mb-3">
                      <input
                        type="password"
                        id="pwd"
                        className="form-control form-control-lg"
                        placeholder="Enter password"
                        name="password"
                        onChange={(event) => setPassword(event.target.value)}
                      />
                      <label className="form-label">Password</label>
                    </div>

                    <div className="text-center text-lg-start mt-4 pt-2">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        style={{
                          paddingLeft: "2.5rem",
                          paddingRight: "2.5rem",
                        }}
                        onClick={handleLogin}
                      >
                        Login
                      </button>
                      <p className="small fw-bold mt-2 pt-1 mb-0">
                        Don't have an account?{" "}
                        <a href="/register" className="link-danger">
                          Register
                        </a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Login;
