import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Navbar, LectureBox } from "../../components";
import lecture1 from "../../images/lecture1.jpg";
import "./style/style.css";

function ViewLectures() {
  const [lectures, setLectures] = useState([]);

  // use no cors mode

  useEffect(() => {
    axios
      .get("http://localhost:8001/lectureList", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        setLectures(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />

      <div className="c">
        {lectures.map((lecture) => (
          <LectureBox
            key={lecture.id}
            id={lecture.id}
            title={lecture.title}
            date={lecture.date}
            time={lecture.time}
          />
        ))}
      </div>
    </>
  );
}

export default ViewLectures;
