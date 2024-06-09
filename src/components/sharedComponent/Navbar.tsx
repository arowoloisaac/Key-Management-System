import { useEffect, useState } from "react";
import Axios from "axios";
import { KeyWith } from "../Key/With";
import "../../assets/CSS/NavbarCSS/Navbar.css";
import { ApiURL, Token } from "../../App";



const NavBar = () => {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [getEMail, setEmail] = useState("");

  const [getWith, setWith] = useState<KeyWith>();
  const [isWith, setIsWith] = useState<boolean>(false);
  const [notification, hasNotification] = useState<boolean>(false);

  // to get the profile of the user
  useEffect(() => {
    Axios.get(`${ApiURL}/profile`, {
      headers: { Authorization: `Bearer ${Token}` },
    })
      .then((res) => {
        setEmail(res.data.email);
      })
      .catch((ex) => {
        ex.response.status;
      });
  }, [Token]);

  // to check if user is authenticated or unauthenticated
  useEffect(() => {
    if (Token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [Token]);

  //this to check if the user has a thirdparty request which returns a booleam value
  useEffect(() => {
    Axios.get(`${ApiURL}/get-notifier`, {
      headers: { Authorization: `Bearer ${Token}` },
    }).then((res) => {
      hasNotification(res.data);
    });
  }, [Token]);

  const handleLogout = (event: any) => {
    event.preventDefault();
    if (isAuthenticated == true) {
      Axios.post(
        `${ApiURL}/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${Token}` },
        }
      )
        .then((res) => {
          res.status;
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          window.location.reload();
        })
        .catch(() => {
          localStorage.clear();
          window.location.reload();
        });
    } else {
      localStorage.clear();
      window.location.reload();
    }
  };

  useEffect(() => {
    Axios.get(`${ApiURL}/with-you`, {
      headers: { Authorization: `bearer ${Token}` },
    }).then((res) => {
      setWith(res.data);
      setIsWith(getWith?.roomNumber !== null);
    });
  }, [Token]);


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
                {isAuthenticated ? (
                  <>
                    {!isWith ? (
                      <>
                        <li className="nav-item">
                          <a className="nav-link" href="/request">
                            InBoard
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="/thirdparty">
                            ThirdParty
                          </a>
                        </li>
                      </>
                    ) : (
                      <li className="nav-item">
                        <a className="nav-link" href="/with">
                          In-Possession
                        </a>
                      </li>
                    )}
                    
                    <li className="nav-item">
                      {notification ? (
                        <a className="nav-link" href="/notification">
                          Notification <span id="notifier">0</span>
                        </a>
                      ) : (
                        <span></span>
                      )}
                    </li>
                  </>
                ) : (
                  <div></div>
                )}
                <span></span>
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
                  <a href="/login" style={{ marginRight: "10px" }}>
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
