import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Navbar, LectureBox } from "../../components";
import "./style/style.css";
import Swal from "sweetalert2";
import { useStateValue } from "../../context/StateProvider";

function ViewLectures() {
  const [lectures, setLectures] = useState([]);
  const [lecturer, setLecturer] = useState([]);
  const [lectureHall, setLectureHall] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    axios.get("http://localhost:8001/lectureHalls").then((res) => {
      setLectureHall(res.data);
    });
  }, [lectureHall]);

  useEffect(() => {
    setTimeout(() => {
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
    }, 2000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get("http://localhost:8001/lecturerList", {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          setLecturer(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 2000);
  }, []);

  // use no cors mode

  function addLecture() {
    var addtoHtml = "";
    lecturer.map((item) => {
      addtoHtml += "<option value=" + item.name + ">" + item.name + "</option>";
    });

    var addtoHtml2 = "";
    lectureHall.map((item) => {
      addtoHtml2 +=
        "<option value=" + item.name + ">" + item.name + "</option>";
    });

    Swal.fire({
      title: "Add Lecture",
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Title" >' +
        '<input id="swal-input2" class="swal2-input" placeholder="Date" type="date">' +
        '<input id="swal-input3" class="swal2-input" placeholder="Time" type="time"> </br>' +
        '<select id="swal-input4" class="swal2-input" placeholder="Lecturer">' +
        addtoHtml +
        "</select>" +
        '<label for="swal-input5">Lecture Hall</label>' +
        '<select id="swal-input5" class="swal2-input" placeholder="Lecture Hall">' +
        addtoHtml2 +
        "</select>",

      focusConfirm: false,
      preConfirm: () => {
        const title = document.getElementById("swal-input1").value;
        const date = document.getElementById("swal-input2").value;
        const time = document.getElementById("swal-input3").value;
        const lecturer = document.getElementById("swal-input4").value;
        const lectureHall = document.getElementById("swal-input5").value;

        // pass in body
        axios
          .get("http://localhost:8001/addLecture", {
            params: {
              title: title,
              date: date,
              time: time,
              lecturer: lecturer,
              lectureHall: lectureHall,
            },
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });
  }

  if (user.type == "admin") {
    return (
      <>
        <Navbar />
        <br />
        <br />
        <br />

        <button className="addLectureButton" onClick={() => addLecture()}>
          Add Lecture
        </button>

        <div className="c">
          {lectures.map((lecture) => (
            <LectureBox
              key={lecture.id}
              id={lecture.id}
              title={lecture.title}
              date={lecture.date}
              time={lecture.time}
              lecturer={lecture.lecturer}
              status={lecture.status}
            />
          ))}
        </div>
      </>
    );
  } else if (user.type === "lecturer") {
    return (
      <>
        <Navbar />
        <br />
        <br />
        <br />

        <button className="addLectureButton" onClick={() => addLecture()}>
          Add Lecture
        </button>
      </>
    );
  }
}

export default ViewLectures;
