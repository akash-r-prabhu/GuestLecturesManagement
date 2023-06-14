import React from "react";
import { useStateValue } from "../../context/StateProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";
import LectureImage from "../../images/IMG_0347.jpg";
import "./style/style.css";
function LectureBox(props) {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    console.log(user);
  }, []);
  const cancelLecture = () => {
    console.log(props);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("http://localhost:8001/cancelLecture", {
            id: props.id,
          })
          .then((res) => {
            Swal.fire("Deleted!", "Your Lecture has been deleted", "success");
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          });
      }
    });
  };

  function acceptLectureRequest(id) {
    return function () {
      axios
        .get("http://localhost:8001/acceptLectureRequest", {
          params: {
            id: id,
          },
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Lecture request accepted",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    };
  }

  function registerForLecture(id) {
    axios
      .get("http://localhost:8001/registerForLecture", {
        params: {
          docId: id,
          studentId: user.studentrollno,
        },
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Registered for lecture",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  }

  return (
    <div className="lecture-box">
      <img src={LectureImage} alt={props.title} />
      <p>
        <b>Title : </b> {props.title}
      </p>
      <p>
        <b> Date : </b> {props.date} {props.time}
      </p>
      <p>
        <b>Resource Person : </b> {props.lecturer}
      </p>
      {props.status == "pending" && user.type != "student" ? (
        <p>
          <b>Status : </b> Pending
        </p>
      ) : (
        <p>
          <b>Status : </b> Accepted
        </p>
      )}
      {/* <a href="#" className="register-button">
        Register
      </a> */}
      {user.type == "lecturer" && props.status == "pending" ? (
        <button
          className="AddLectureButton"
          onClick={acceptLectureRequest(props.id)}
        >
          Accept
        </button>
      ) : (
        <></>
      )}
      {user.type == "admin" ? (
        <button
          className="CancelLectureButton"
          onClick={() => cancelLecture(props.id)}
        >
          Cancel Lecture
        </button>
      ) : (
        <></>
      )}
      {user.type == "student" && !props.alreadyRegistered ? (
        <button
          className="register-button"
          onClick={() => registerForLecture(props.id)}
        >
          Register
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default LectureBox;
