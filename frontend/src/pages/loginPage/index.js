import React, { useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";

import axios from "axios";
import swal from "sweetalert";
import { useStateValue } from "../../context/StateProvider";
import { useState } from "react";

import "./style/style.css";
import { use } from "express/lib/router";

function LoginPage() {
  const [{ user }, dispatch] = useStateValue();
  const [registerOrlogin, setRegisterOrLogin] = useState("login");
  const [formUserType, setFormUserType] = useState("student");

  useEffect(() => {
    if (formUserType == "student") {
      document.getElementById("studentrollno2").style.display = "block";
    } else {
      document.getElementById("studentrollno2").style.display = "none";
      document.getElementById("studentrollno2").required = false;
    }
  }, [formUserType]);

  useEffect(() => {
    if (registerOrlogin == "login") {
      document.getElementById("loginForm").style.display = "block";
      document.getElementById("registerForm").style.display = "none";
    } else {
      document.getElementById("loginForm").style.display = "none";
      document.getElementById("registerForm").style.display = "block";
    }
  }, [registerOrlogin]);

  function toggleFormDisplay() {
    if (registerOrlogin == "login") {
      setRegisterOrLogin("register");
    } else {
      setRegisterOrLogin("login");
    }
  }

  function onsubmitform1(e) {
    e.preventDefault();
    console.log("Form submitted");
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var usertype = document.getElementById("usertype").value;
    // clear the form
    document.getElementById("loginForm").reset();

    var url =
      "http://localhost:8001/checkUser?email=" +
      username +
      "&password=" +
      password;
    axios.get(url).then((response) => {
      console.log(response.data);
      if (response.data.type == usertype) {
        if (usertype == "student") {
          swal("Login Successful", "Welcome Student", "success");
          dispatch({
            type: "SET_USER",
            user: response.data,
            usertype: "student",
            userid: response.data.id,
          });
          reactLocalStorage.setObject("user", response.data);
          document.getElementById("loginForm").reset();
        } else if (usertype == "lecturer") {
          swal("Login Successful", "Welcome Lecturer", "success");
          dispatch({
            type: "SET_USER",
            user: response.data,
            usertype: "lecturer",
            userid: response.data.id,
          });

          reactLocalStorage.setObject("user", response.data);
          document.getElementById("loginForm").reset();
        } else if (usertype == "admin") {
          swal("Login Successful", "Welcome Admin", "success");
          dispatch({
            type: "SET_USER",
            user: response.data,
            usertype: "admin",
            userid: response.data.id,
          });
          reactLocalStorage.setObject("user", response.data);
          document.getElementById("loginForm").reset();
        } else {
          swal("Invalid Credentials", "Please try again", "error");
          document.getElementById("loginForm").reset();
        }
      } else {
        swal("Invalid Credentials", "Please try again", "error");
        document.getElementById("loginForm").reset();
      }
    });
  }
  function onsubmitform2(e) {
    e.preventDefault();
    console.log("Form submitted");
    var name = document.getElementById("name2").value;
    var email = document.getElementById("email2").value;
    var password = document.getElementById("password2").value;
    var dob = document.getElementById("dob2").value;
    var studentrollno = document.getElementById("studentrollno2").value;
    var type = document.getElementById("type2").value;
    // clear the form
    document.getElementById("registerForm").reset();
    // http://localhost:8001/register?name=abc&type=student&email=abc@gmail&password=123&dob=2021-10-10&studentrollno=123
    var registerUrl =
      "http://localhost:8001/register?name=" +
      name +
      "&type=" +
      type +
      "&email=" +
      email +
      "&password=" +
      password +
      "&dob=" +
      dob +
      "&studentrollno=" +
      studentrollno;

    var checkEmailUrl = "http://localhost:8001/checkEmail?email=" + email;
    axios.get(checkEmailUrl).then((response) => {
      console.log(response.data);
      if (response.data == "success") {
        swal("Email already exists", "Please try again", "error");
        document.getElementById("registerForm").reset();
        toggleFormDisplay();
      } else {
        axios.get(registerUrl).then((response) => {
          console.log(response.data);
          if (response.data == "success") {
            swal("Registration Successful", "Please login", "success");
            toggleFormDisplay();
            document.getElementById("registerForm").reset();
          } else {
            swal("Registration Failed", "Please try again", "error");
            document.getElementById("registerForm").reset();
          }
        });
      }
    });
  }
  return (
    <>
      <title>LOGIN</title>
      {/* <link rel="stylesheet" type="text/css" href="lstyle.css" /> */}

      <h1>WELCOME TO GUEST LECTURE MANAGEMENT SYSTEM</h1>
      <br />
      <br />
      <br />
      <br />

      <div className="center">
        <div className="container">
          <form id="loginForm" onSubmit={onsubmitform1}>
            <h2>LOGIN</h2>
            <div className="form-group">
              {/* <label htmlFor="username">Email:</label> */}
              <input
                type="email"
                id="username"
                name="username"
                required
                placeholder="Email id"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                title="Enter a valid email id"
              />
            </div>
            <br />
            <div className="form-group">
              {/* <label htmlFor="password">Password:</label> */}
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="Password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              />
            </div>
            <br />
            <div className="form-group">
              {/* <label htmlFor="usertype">User Type:</label> */}
              <select id="usertype" name="usertype" required>
                <option value="admin">Admin</option>
                <option value="student">Student</option>
                <option value="lecturer">Lecturer</option>
                <option value="lecturer">Lecturer</option>
              </select>
            </div>
            <br />
            <div className="form-group">
              <button type="submit">LOGIN</button>
            </div>
            <br />
            <br />
            <label>New User?</label>
            <button onClick={toggleFormDisplay}>SIGN UP</button>
          </form>

          {/* if not registered register */}

          {/* REGISTRATION FOR Users { name,type,email, password,dob,studentrollno} */}
          <form id="registerForm" onSubmit={onsubmitform2}>
            <h2>SIGN UP</h2>
            <div className="form-group">
              {/* <label htmlFor="name">Name:</label> */}
              <input
                type="text"
                id="name2"
                name="name"
                required
                placeholder="Name"
              />
              <br />

              {/* <label htmlFor="email">Email:</label> */}
              <input
                type="email"
                id="email2"
                name="email"
                required
                placeholder="Email id"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                title="Enter a valid email id"
              />
              <br />
              {/* <label htmlFor="password">Password:</label> */}
              <input
                type="password"
                id="password2"
                name="password"
                required
                placeholder="Password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              />
              <br />
              {/* <label htmlFor="dob">Date of Birth:</label> */}
              {/* <input
                onfocus="(this.type='date')"
                type="text"
                id="dob2"
                name="dob"
                required
                placeholder="Date of Birth"
              /> */}
              <br />

              <label htmlFor="dob">Date of Birth:</label>

              <input type="date" id="dob2" name="dob" required />

              <label htmlFor="studentrollno">Student Roll No:</label>
              <input
                type="text"
                id="studentrollno2"
                name="studentrollno"
                // required
              />

              <label htmlFor="type">User Type:</label>
              <select id="type2" name="type" required>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
                <option value="lecturer">Lecturer</option>
              </select>
              <br />
              <br />
              <br />
              <button type="submit">Register</button>
              <br />
              <br />
              <br />
              <label>Already registered?</label>
              <button onClick={toggleFormDisplay}>Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
