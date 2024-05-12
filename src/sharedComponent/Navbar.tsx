import { useEffect, useState } from "react";
import Axios from "axios";

const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const savedData = localStorage.getItem("token");
  const [getEMail, setEmail] = useState("");

  const [status, setStatus] = useState<number>()

  useEffect(() => {
    Axios.get("https://localhost:7267/api/profile", {
      headers: { Authorization: `Bearer ${savedData}` },
    }).then((res) => {
      setEmail(res.data.email);
    });
  });

  useEffect(() => {
    if (savedData) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  });

  const handleLogout = () => {
    if (!isAuthenticated) {
      Axios.post(
        "https://localhost:7267/api/logout",
        {},
        {
          headers: { Authorization: `Bearer ${savedData}` },
        }
      ).then((res) => {
        setStatus(res.status)

        if (status === 200) {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          localStorage.clear();
          window.location.reload();
        }
      });
    } else {
      if (status === 401 || status === 403) {
        localStorage.clear();
        window.location.reload();
      }
      // localStorage.clear();
      // window.location.reload();
    }
    
  };

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              Key System
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                </li>
                {/* <li className="nav-item">
                  <a className="nav-link" href="/Key">
                    RequestKey
                  </a>
                </li> */}
                <li className="nav-item">
                  <a className="nav-link" href="#"></a>
                </li>
              </ul>
              <div></div>
              {isAuthenticated === true ? (
                <div>
                  <a href="/profile">
                    <span style={{ marginRight: "20px" }}>{getEMail}</span>
                  </a>
                  <a href="">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </a>
                </div>
              ) : (
                <div>
                  <a href="/login" style={{ marginRight: "1%" }}>
                    <button type="button" className="btn btn-secondary">
                      Login
                    </button>
                  </a>
                  <a href="/register">
                    <button type="button" className="btn btn-secondary">
                      Register
                    </button>
                  </a>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
