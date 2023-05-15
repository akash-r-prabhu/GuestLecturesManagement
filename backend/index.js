var http = require("http");
var url = require("url");
var fs = require("fs");
// import exports.db from backend/firebase.js
var db = require("./firebase.js").db;
var express = require("express");
var cors = require("cors");
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

// to register a student to database
app.get("/register", async function (req, res) {
  const queryObject = url.parse(req.url, true).query;
  const student = {
    name: queryObject.name,
    email: queryObject.email,
    phone: queryObject.phone,
    lecture: queryObject.lecture,
  };
  const docRef = await db.collection("students").add(student);
  res.send("Student registered successfully");
});
// sample url: http://localhost:8001/register?name=student1&email=student1@gmail&phone=123456789&lecture=lecture1
