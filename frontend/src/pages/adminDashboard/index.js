import { React, useEffect, useState } from "react";
import { Navbar, RoomManagement } from "../../components";
import { useStateValue } from "../../context/StateProvider";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./style/style.css";
import { use } from "express/lib/router";
import ViewLectures from "../viewLectures";
import Swal from "sweetalert2";

function AdminDashboard() {
  const [{ user }, dispatch] = useStateValue();
  const [LectureHalls, setLectureHalls] = useState([]);
  const [lecturerRequests, setLecturerRequests] = useState([]);
  const Swal = require("sweetalert2");

  useEffect(() => {
    async function fetchLecturerRequests() {
      const request = await axios.get("http://localhost:8001/lecturerRequests");
      setLecturerRequests(request.data);
      return request;
    }
    setTimeout(() => {
      fetchLecturerRequests();
    }, 1000);
  }, [lecturerRequests]);
  async function approveLecturer(id) {
    const request = await axios.post(
      `http://localhost:8001/approveLecturer?id=${id}`
    );
    return request;
  }

  async function rejectLecturer(id) {
    const request = await axios.post(
      `http://localhost:8001/rejectLecturer?id=${id}`
    );
    return request;
  }

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
            <Link to="/2" className="card">
              <div className="card-content">
                <i className="fas fa-eye fa-7x" />
                <h2>View Request</h2>
                <p>Manage lectures and course materials.</p>
              </div>
            </Link>
            <Link to="/viewLectures" className="card">
              <div className="card-content">
                <i className="fas fa-calendar-alt fa-7x" />
                <h2>Lecture Schdule</h2>
                <p>Manage lectures and course materials.</p>
              </div>
            </Link>
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
    return (
      <>
        <Navbar />
        <RoomManagement rooms={LectureHalls} />
      </>
    );
  } else if (id == 2) {
    return (
      <>
        <Navbar />
        <br />
        <br />
        <br />

        <>
          <title>View Guest Lecture Requests</title>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n    body {\n      font-family: Arial, sans-serif;\n      margin: 20px;\n    }\n\n    h1, h2 {\n      color: #333;\n    }\n\n    .requests-container {\n      display: flex;\n      flex-wrap: wrap;\n    }\n\n    .request-box {\n      flex: 0 0 calc(33.33% - 20px);\n      margin: 10px;\n      padding: 20px;\n      border: 1px solid #ccc;\n      background-color: #f9f9f9;\n    }\n\n    p {\n      margin: 5px 0;\n    }\n\n    /* Styling for buttons */\n    .action-button {\n      background-color: #4CAF50;\n      color: #fff;\n      border: none;\n      padding: 10px 20px;\n      text-align: center;\n      text-decoration: none;\n      display: inline-block;\n      font-size: 14px;\n      margin-top: 10px;\n      cursor: pointer;\n    }\n\n    .action-button:hover {\n      background-color: #45a049;\n    }\n  ",
            }}
          />
          <div className="requests-container">
            {/* Guest Lecture Request 1 */}

            {lecturerRequests.map((request) => (
              <div className="request-box">
                <h2>Request Details</h2>
                <p>Request ID: {request?.id} </p>
                <p>Requester Name: {request.name}</p>
                <p>Requester Email: {request.email}</p>
                {/* ...Rest of the request details... */}
                <h2>Guest Speaker Information</h2>
                <p>Speaker Name: {request.name}</p>
                {/* ...Rest of the speaker information... */}
                {/* ...Rest of the sections... */}
                <h2>Status and Actions</h2>
                <p>Status: {request?.status || "pending"}</p>
                <button
                  className="action-button"
                  onClick={() => approveLecturer(request.id)}
                >
                  Approve
                </button>
                &nbsp; &nbsp;
                <button
                  className="action-button"
                  onClick={() => rejectLecturer(request.id)}
                >
                  Decline
                </button>
              </div>
            ))}
          </div>
        </>
      </>
    );
  }
}

export default AdminDashboard;
