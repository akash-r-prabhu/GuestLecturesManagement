import React from "react";

function LectureBox(props) {
  return (
    <div className="lecture-box">
      <img src={props.image} alt={props.title} />
      <h2>{props.title}</h2>
      <p>{props.date}</p>
      <p>{props.time}</p>
      <br />
      <a href="#" className="register-button">
        Register
      </a>
    </div>
  );
}

export default LectureBox;
