import React from "react";

function LectureBox(props) {
  return (
    <div className="lecture-box">
      <img
        src="https://sustainability.tufts.edu/wp-content/uploads/IMG_0347.jpg"
        alt={props.title}
      />
      <p>Title {props.title}</p>
      <p>Date {props.date}</p>
      <p>Time {props.time}</p>
      <p>Lecturer {props.lecturer}</p>
      <p>Status {props.status}</p>
      <a href="#" className="register-button">
        Register
      </a>
    </div>
  );
}

export default LectureBox;
