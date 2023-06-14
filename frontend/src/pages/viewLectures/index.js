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
  const [lecturesForLecturer, setLecturesForLecturer] = useState([]);
  const [lecturesForStudent, setLecturesForStudent] = useState([]);
  // tomorrows date in format DD-MM-YYYY
  // const today = new Date().toISOString().slice(0, 10);
  const today = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  // current time
  // const time = new Date().toLocaleTimeString();

  const filter = (arg) => {
    var addtoHtml = "";
    var addtoHtml2 = "";
    addtoHtml += "<option >" + "Select a title" + "</option>";
    lectures.map((item) => {
      addtoHtml +=
        "<option value=" + item.title + ">" + item.title + "</option>";
      addtoHtml2 +=
        "<option value=" + item.lecturer + ">" + item.lecturer + "</option>";
    });
    Swal.fire({
      title: "Filter Lectures",
      html:
        '<select id="filter-swal-input1" class="swal2-input" placeholder="Lecture">' +
        addtoHtml +
        "</select>" +
        // select date
        '<input id="filter-swal-input2" class="swal2-input" placeholder="Date" type="date">' +
        // lecturer
        '<select id="filter-swal-input3" class="swal2-input" placeholder="Lecturer">' +
        '<option value="">' +
        "Select a lecturer" +
        "</option>" +
        addtoHtml2 +
        "</select>",

      focusConfirm: false,

      preConfirm: () => {
        if (arg === "admin") {
          const lecture_title =
            document.getElementById("filter-swal-input1").value;
          if (lecture_title) {
            setLectures(lectures.filter((item) => item.title == lecture_title));
          }
          const date = document.getElementById("filter-swal-input2").value;

          if (date) {
            setLectures(lectures.filter((item) => item.date == date));
          }

          const lecturer = document.getElementById("filter-swal-input3").value;
          if (lecturer) {
            setLectures(lectures.filter((item) => item.lecturer == lecturer));
          }
        } else if (arg === "student") {
          const lecture_title =
            document.getElementById("filter-swal-input1").value;
          if (lecture_title) {
            setLecturesForStudent(
              lecturesForStudent.filter((item) => item.title == lecture_title)
            );
          }
          const date = document.getElementById("filter-swal-input2").value;

          if (date) {
            setLecturesForStudent(
              lecturesForStudent.filter((item) => item.date == date)
            );
          }

          const lecturer = document.getElementById("filter-swal-input3").value;
          if (lecturer) {
            setLecturesForStudent(
              lecturesForStudent.filter((item) => item.lecturer == lecturer)
            );
          }
        }
      },
    });
  };

  useEffect(() => {
    if (user.type == "lecturer") {
      axios
        .get("http://localhost:8001/lecturesForLecturer", {
          params: {
            name: user.name,
          },
        })
        .then((res) => {
          setLecturesForLecturer(res.data);
        });
    }

    if (user.type == "student") {
      axios
        .get("http://localhost:8001/lecturesForStudent", {
          params: {
            name: "3333",
          },
        })
        .then((res) => {
          setLecturesForStudent(res.data);
        });
    }
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8001/lectureHalls").then((res) => {
      setLectureHall(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8001/lectureList").then((res) => {
      setLectures(res.data);
    });
    console.log(lectures);
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8001/lecturerList").then((res) => {
      setLecturer(res.data);
    });
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
        '<input id="swal-input2" class="swal2-input" placeholder="Date" type="date" min=' +
        today +
        "> </br>" +
        '<input id="swal-input3" class="swal2-input" placeholder="Time" type="time" ' +
        "> </br>" +
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

        console.log(title);
        console.log(date);
        console.log(time);
        console.log(lecturer);
        console.log(lectureHall);

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
        <br />
        <div className="CenterButtons">
          <button onClick={() => addLecture()}>ADD LECTURE</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={() => filter("admin")}>FILTER</button>
        </div>
        <br />
        <br />
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
        <div className="c">
          {lecturesForLecturer.map((lecture) => (
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
  } else if (user.type === "student") {
    return (
      <>
        <Navbar />
        <br />
        <br />
        <br />
        <button onClick={() => filter("student")}>Filter lecture</button>
        <div className="c">
          {lecturesForStudent.map((lecture) => (
            <LectureBox
              key={lecture.id}
              id={lecture.id}
              title={lecture.title}
              date={lecture.date}
              time={lecture.time}
              lecturer={lecture.lecturer}
              status={lecture.status}
              alreadyRegistered={lecture.alreadyRegistered}
            />
          ))}
        </div>
      </>
    );
  }
}

export default ViewLectures;
