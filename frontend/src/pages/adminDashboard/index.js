import { React, useEffect } from "react";
import { Navbar } from "../../components";
import { useStateValue } from "../../context/StateProvider";

function AdminDashboard() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <>
      <Navbar />
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
          <a className="room" href="roombooking.html">
            <div className="card">
              <div className="card-content">
                <i className="fas fa-building fa-7x" />
                <h2>Hall Management</h2>
                <p>Manage halls and scheduling of events.</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
