import React, { useEffect, useState } from "react";
import { Navbar } from "../../components";
import "./style/mainbody.css";
import "./style/sidebar.css";
import "./style/activities.css";
import { AdminDashboard } from "../index";

function Homepage() {
  const [time, setTime] = useState("");

  useEffect(() => {
    var datetime = new Date();
    setTime(datetime.toString());
  }, [time]);

  return (
    <>
      <Navbar />
      {/* Mainbody */}
      <AdminDashboard />
    </>
  );
}

export default Homepage;
