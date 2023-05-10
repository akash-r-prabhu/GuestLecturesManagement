import React from "react";
import "./style/style.css";
// import all images from img folder
import search from "../../images/search.png";
import akash from "../../images/akash.jfif";

function Navbar() {
  return (
    <>
      {/* Nav bar header */}
      <header className="header">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="logo">
              <a href="#" className="abc" style={{ color: "#019ED3" }}>
                <b>GLMS</b>
              </a>
            </div>
            <button type="button" className="nav-toggler">
              <span />
            </button>
            <nav className="nav">
              <ul>
                <div className="wrap">
                  <div className="search">
                    <input
                      type="text"
                      className="searchTerm"
                      placeholder="What are you looking for?"
                    />
                    <button type="submit" className="searchButton">
                      <img src={search} alt="" />
                    </button>
                  </div>
                </div>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/viewLectures">ViewLectures</a>
                </li>
                <li>
                  <a>Feedback</a>
                </li>
                <li>
                  <a>calender</a>
                </li>
                <li>
                  <a>about</a>
                </li>
                <li>
                  <a href="../../profilesection/index.html">
                    <img src={akash} alt="" style={{ height: 30 }} />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
