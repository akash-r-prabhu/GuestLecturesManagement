import { React, useEffect, useState } from "react";
import { Navbar, RoomManagement } from "../../components";
import { useStateValue } from "../../context/StateProvider";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./style/style.css";

function AdminDashboard() {
  const [{ user }, dispatch] = useStateValue();
  const [LectureHalls, setLectureHalls] = useState([]);
  const Swal = require("sweetalert2");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get("http://localhost:8001/lectureHalls");
      setLectureHalls(request.data);
      return request;
    }
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, [LectureHalls]);

  let { id } = useParams();
  console.log(id);
  // return (
  //   <>
  //     <Navbar />
  //     <RoomManagement />
  //   </>
  // );
  if (!id) {
    return (
      <>
        <Navbar />
      </>
    );
  } else if (id == 0) {
    return (
      <>
        <Navbar />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n    /* Styling for the side navigation bar */\n    .sidebar {\n      height: 100%;\n      width: 180px;\n      position: fixed;\n      top: 0;\n      left: 0;\n      background-color: #333;\n      overflow-x: hidden;\n      padding-top: 20px;\n    }\n    \n    .sidebar a {\n      padding: 10px;\n      text-decoration: none;\n      font-size: 16px;\n      color: #f2f2f2;\n      display: block;\n    }\n    \n    .sidebar a:hover {\n      background-color: #ddd;\n      color: black;\n    }\n    \n    /* Styling for the dropdown */\n    .dropdown-content {\n      display: none;\n    }\n    \n    .sidebar .dropdown:hover .dropdown-content {\n      display: block;\n    }\n\n    /* Styling for the main content */\n    .content {\n      margin-left: 200px;\n      padding: 20px;\n    }\n    \n    /* Styling for the cards */\n    .card-container {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      flex-wrap: wrap;\n      margin-top: 20px;\n    }\n    \n    .card {\n      background-color: #fff;\n      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);\n      width: 400px;\n      height: 250px;\n      margin: 20px;\n      text-align: center;\n      font-family: arial;\n      border-radius: 10px;\n      overflow: hidden;\n      transition: border-color 0.3s;\n      cursor: pointer;\n    }\n    \n    .card:hover {\n      border-color: #000;\n    }\n    \n    .card-content {\n      padding: 20px;\n    }\n    \n    .card h2 {\n      margin-top: 0; color:black;\n    }\n    \n    .card p {\n      margin-bottom: 0;\n    }\n.room{\n  text-decoration:none;\n  color:black;\n}\n    /* Styling for the background image */\n    body {\n      background-image: url('hip.jpg');\n      background-size: cover;\n      background-repeat: no-repeat;\n      background-position: center;\n      margin: 0;\n      padding: 0;\n      height: 100vh;\n    }\n  ",
          }}
        />
        <div className="content">
          {/* Cards */}
          <div className="card-container">
            <div className="card">
              <div className="card-content">
                <i className="fas fa-eye fa-7x" />
                <h2>View Request</h2>
                <p>Manage lectures and course materials.</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <i className="fas fa-calendar-alt fa-7x" />
                <h2>Lecture Schdule</h2>
                <p>Manage lectures and course materials.</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <i className="fas fa-comment fa-7x" />
                <h2>View Feedback</h2>
                <p>Manage lectures and course materials.</p>
              </div>
            </div>
            <Link to="/1" className="room">
              <div className="card">
                <div className="card-content">
                  <i className="fas fa-building fa-7x" />
                  <h2>Hall Management</h2>
                  <p>Manage halls and scheduling of events.</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </>
    );
  } else if (id == 1) {
    return <RoomManagement rooms={LectureHalls} />;
  } else if (id == 2) {
    return (
      <>
        <Navbar />
        <div>hey</div>
      </>
    );
  }
}

export default AdminDashboard;
