import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import ViewProfile from "./components/Profile/ViewProfile";
import UpdateProfile from "./components/Profile/UpdateProfile";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/js/src/collapse.js";
import Home from "./components/Home/Home";
import PageError from "./components/Error/PageError";
import NavBar from "./components/sharedComponent/Navbar";
import RequestKey from "./components/Key/RequestKey";
import ThirdParty from "./components/Key/ThirdParty";
import With from "./components/Key/With";
import ReviewRequest from "./components/Key/ReviewRequest";

function App() {
  return (
    <>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ViewProfile />} />
          <Route path="/edit-profile" element={<UpdateProfile />} />
          <Route path="/request" element={<RequestKey />} />
          <Route path="/thirdparty" element={<ThirdParty />} />
          <Route path="/with" element={<With />} />
          <Route path="/notification" element={<ReviewRequest />} />
          <Route path="/*" element={<PageError />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
