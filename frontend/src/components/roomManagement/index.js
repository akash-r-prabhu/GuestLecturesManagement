import React from "react";
import "./style/style.css";
import Swal from "sweetalert2";
import axios from "axios";

function RoomManagement(props) {
  function addHall() {
    Swal.fire({
      title: "Enter Lecture Hall Details",
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Name">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Capacity">',
      focusConfirm: false,
      preConfirm: () => {
        const name = Swal.getPopup().querySelector("#swal-input1").value;
        const capacity = Swal.getPopup().querySelector("#swal-input2").value;
        if (!name || !capacity) {
          Swal.showValidationMessage(`Please enter name and capacity`);
        }

        return { name: name, capacity: capacity };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result.value.name);
        console.log(result.value.capacity);
        axios
          .get(
            "http://localhost:8001/addLectureHall?name=" +
              result.value.name +
              "&capacity=" +
              result.value.capacity
          )
          .then((response) => {
            console.log(response.data);

            if (response.data == "success") {
              Swal.fire({
                icon: "success",
                title: "Lecture Hall Added Successfully",
                showConfirmButton: false,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }

  function deleteHall(id) {
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
          .get("http://localhost:8001/deleteHall?id=" + id)
          .then((response) => {
            console.log(response.data);
            console.log(id);

            if (response.data == "success") {
              Swal.fire({
                icon: "success",
                title: "Lecture Hall Deleted Successfully",
                showConfirmButton: false,
              });
            } else {
              Swal.fire({
                icon: "error",

                title: "Oops...",
                text: "Something went wrong!",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }

  return (
    <>
      <br /> <br />
      <h1 className="room-heading">Room Management</h1>
      <button className="add-room-button" onClick={addHall}>
        Add Room
      </button>
      <br />
      <div className="room-container">
        {props.rooms.map((room) => {
          return (
            <div className="room-card">
              <h2>{room.name}</h2>
              <img
                className="room-image"
                src="https://www.apicellabunton.com/wp-content/uploads/2018/09/1-16.jpg"
                alt="Room 1"
              />
              <p className="room-description">CAPACITY:{room.capacity}</p>
              <button className="book-button" onclick="bookRoom(1)">
                Book{" "}
              </button>
              <button
                className="book-button"
                onClick={() => deleteHall(room.id)}
              >
                Delete
              </button>
            </div>
          );
        })}

        {/* Repeat the above code for more rooms */}
      </div>
    </>
  );
}

export default RoomManagement;
