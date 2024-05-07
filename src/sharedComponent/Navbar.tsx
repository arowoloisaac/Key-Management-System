
const NavBar = () => {
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
                <li className="nav-item">
                  <a className="nav-link" href="/Key">
                    RequestKey
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    
                  </a>
                </li>
              </ul>
              <div></div>
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
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
