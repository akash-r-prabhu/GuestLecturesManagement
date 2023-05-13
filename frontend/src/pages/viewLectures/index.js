import React from "react";
import axios from "../../axios";
import { useState, useEffect } from "react";
import { Navbar, LectureBox } from "../../components";
import lecture1 from "../../images/lecture1.jpg";
import "./style/style.css";

function ViewLectures() {
  const [lectures, setLectures] = useState([]);

  // use no cors mode

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get("/lectures");
      setLectures(request.data);
      return request;
    }
    fetchData();
  }, []);

  return (
    <>
      <Navbar />

      <div className="c">
        <LectureBox
          image={lecture1}
          title="Lecture 1: Introduction to Programming"
          date="Date: May 10, 2023"
          time="Time: 10:00 AM - 12:00 PM"
        />
        <LectureBox
          image={lecture1}
          title="Lecture 1: Introduction to Programming"
          date="Date: May 10, 2023"
          time="Time: 10:00 AM - 12:00 PM"
        />
      </div>
    </>
  );
}

export default ViewLectures;
