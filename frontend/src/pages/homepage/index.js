import React, { useEffect, useState } from "react";
import { Navbar } from "../../components";
import "./style/mainbody.css";
import "./style/sidebar.css";
import "./style/activities.css";
import { AdminDashboard } from "../index";
import { useStateValue } from "../../context/StateProvider";

function Homepage() {
  const [time, setTime] = useState("");
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    var datetime = new Date();
    setTime(datetime.toString());
  }, [time]);

  switch (user.type) {
    case "admin":
      return <AdminDashboard />;
    case "student":
      return <h1>Student Dashboard</h1>;
    case "lecturer":
      return (
        <>
          <Navbar />
          <br />
          <br />
          <br />

          <h1>Lecturer Homepage</h1>
        </>
      );
    default:
      // return error with invalid user type
      return <h1>Invalid user type</h1>;
  }
}

export default Homepage;
