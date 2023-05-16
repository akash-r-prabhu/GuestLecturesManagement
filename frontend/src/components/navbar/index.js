import React from "react";
import { useStateValue } from "../../context/StateProvider";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./style/style.css";

function Navbar() {
  const [{ user }, dispatch] = useStateValue();
  var logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    localStorage.clear();
  };

  return (
    <>
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Lato"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <div className="w3-top">
        <div className="w3-bar w3-black w3-card">
          <a
            className="w3-bar-item w3-button w3-padding-large w3-hide-medium w3-hide-large w3-right"
            href="javascript:void(0)"
            onclick="myFunction()"
            title="Toggle Navigation Menu"
          >
            <i className="fa fa-bars" />
          </a>

          <Link to="/" className="w3-bar-item w3-button w3-padding-large">
            HOME
          </Link>
          <Link
            to="/viewLectures"
            className="w3-bar-item w3-button w3-padding-large"
          >
            ViewLectures
          </Link>
          <a
            href="fb.html"
            className="w3-bar-item w3-button w3-padding-large w3-hide-small"
          >
            FEED BACK
          </a>
          <a
            href="#contact"
            className="w3-bar-item w3-button w3-padding-large w3-hide-small"
          >
            CONTACT
          </a>
          <a
            href="javascript:void(0)"
            className="w3-padding-large w3-hover-red w3-hide-small w3-right"
          >
            <i className="fa fa-search" />
          </a>
          <div
            className="w3-bar-item w3-button w3-padding-large w3-hide-small"
            onClick={logout}
          >
            Logout
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
