var http = require("http");
var url = require("url");
var fs = require("fs");
// import exports.db from backend/firebase.js
var db = require("./firebase.js").db;
var express = require("express");
var cors = require("cors");
const e = require("express");
var app = express();

app.use(cors());

app.get("/addLecture", async function (req, res) {
  const queryObject = url.parse(req.url, true).query;
  const lecture = {
    title: queryObject.title,
    date: queryObject.date,
    time: queryObject.time,
  };
  const docRef = await db.collection("lectures").add(lecture);
  res.send("Lecture added successfully");
});
// sample url: http://localhost:8001/addLecture?title=lecture1&date=2021-10-10&time=10:00

app.get("/lectureList", async function (req, res) {
  const lectures = [];
  const querySnapshot = await db.collection("lectures").get();
  querySnapshot.forEach((doc) => {
    lectures.push(doc.data());
  });
  res.send(lectures);
});

app.listen(8001, function () {
  console.log("CORS-enabled web server listening on port 8001");
});

// to register a user to database Users { name,type,email, password,dob,studentrollno}
app.get("/register", async function (req, res) {
  const queryObject = url.parse(req.url, true).query;
  const user = {
    name: queryObject.name,
    type: queryObject.type,
    email: queryObject.email,
    password: queryObject.password,
    dob: queryObject.dob,
    studentrollno: queryObject.studentrollno,
  };
  const docRef = await db.collection("users").add(user);
  if (docRef.id) {
    res.send("success");
  } else {
    res.send("User not added");
  }
});
// sample url: http://localhost:8001/register?name=abc&type=student&email=abc@gmail&password=123&dob=2021-10-10&studentrollno=123

app.get("/checkUser", async function (req, res) {
  const queryObject = url.parse(req.url, true).query;
  const email = queryObject.email;
  const password = queryObject.password;
  const querySnapshot = await db.collection("users").get();

  let found = false; // Flag variable

  querySnapshot.forEach((doc) => {
    if (doc.data().email == email && doc.data().password == password) {
      found = true;
      res.send(doc.data());
    }
  });

  if (!found) {
    res.send("Invalid Credentials");
  }
});

app.get("/checkEmail", async function (req, res) {
  const queryObject = url.parse(req.url, true).query;
  const email = queryObject.email;
  const querySnapshot = await db.collection("users").get();

  let found = false; // Flag variable

  querySnapshot.forEach((doc) => {
    if (doc.data().email == email) {
      found = true;
    }
  });

  if (found) {
    res.send("success");
  } else {
    res.send("Invalid Credentials");
  }
});

app.get("/lectureHalls", async function (req, res) {
  const lectureHalls = [];
  const querySnapshot = await db.collection("lectureHalls").get();
  querySnapshot.forEach((doc) => {
    lectureHalls.push({
      id: doc.id,
      name: doc.data().name,
      capacity: doc.data().capacity,
    });
  });
  res.send(lectureHalls);
});

app.get("/addLectureHall", async function (req, res) {
  const queryObject = url.parse(req.url, true).query;
  const lectureHall = {
    name: queryObject.name,
    capacity: queryObject.capacity,
  };
  const docRef = await db
    .collection("lectureHalls")
    .add(lectureHall)
    .then((docRef) => {
      res.send("success");
    })
    .catch((error) => {
      res.send("error");
    });
});

// sample url: http://localhost:8001/addLectureHall?name=lectureHall1&capacity=100

// deleteHall by id
app.get("/deleteHall", async function (req, res) {
  const queryObject = url.parse(req.url, true).query;
  const id = queryObject.id;
  const docRef = await db.collection("lectureHalls").doc(id).delete();
  res.send("success");
});
