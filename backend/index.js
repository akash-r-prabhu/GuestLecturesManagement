var http = require("http");
var url = require("url");
var fs = require("fs");
// import exports.db from backend/firebase.js
var db = require("./firebase.js").db;
var express = require("express");
var cors = require("cors");

const bodyParser = require("body-parser");
const e = require("express");
var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
  if (queryObject.type == "lecturer") {
    user.studentrollno = "";
    user.status = "pending";
  }

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

app.get("/lecturerRequests", async function (req, res) {
  const lecturerRequests = [];
  const querySnapshot = await db.collection("users").get();
  querySnapshot.forEach((doc) => {
    if (doc.data().type == "lecturer" && doc.data().status == "pending") {
      lecturerRequests.push({
        id: doc.id,
        name: doc.data().name,
        email: doc.data().email,
        dob: doc.data().dob,
        type: doc.data().type,
        status: doc.data().status,
      });
    }
  });
  res.send(lecturerRequests);
});

app.get("/lecturerList", async function (req, res) {
  const lecturerList = [];
  const querySnapshot = await db.collection("users").get();
  querySnapshot.forEach((doc) => {
    if (doc.data().type == "lecturer" && doc.data().status == "approved") {
      lecturerList.push({
        id: doc.id,
        name: doc.data().name,
        email: doc.data().email,
        dob: doc.data().dob,
        type: doc.data().type,
        status: doc.data().status,
      });
    }
  });
  res.send(lecturerList);
});

app.post("/approveLecturer", async function (req, res) {
  const queryObject = url.parse(req.url, true).query;
  const id = queryObject.id;
  const docRef = await db.collection("users").doc(id).update({
    status: "approved",
  });
  res.send("success");
});

app.post("/rejectLecturer", async function (req, res) {
  const queryObject = url.parse(req.url, true).query;
  const id = queryObject.id;
  const docRef = await db.collection("users").doc(id).delete();
  res.send("success");
});

app.get("/addLecture", async function (req, res) {
  const queryObject = url.parse(req.url, true).query;
  console.log(queryObject);
  const lecture = {
    title: queryObject.title,
    date: queryObject.date,
    time: queryObject.time,
    lectureHall: queryObject.lectureHall,
    lecturer: queryObject.lecturer,
    status: "pending",
  };
  const docRef = await db

    .collection("lectures")
    .add(lecture)
    .then((docRef) => {
      res.send("success");
    })
    .catch((error) => {
      res.send("error");
    });
});
app.get("/rejectLecture", async function (req, res) {
  const queryObject = url.parse(req.url, true).query;
  const id = queryObject.id;
  const docRef = await db.collection("lectures").doc(id).delete();
  res.send("success");
});
app.get("/acceptLecture", async function (req, res) {
  const queryObject = url.parse(req.url, true).query;
  const id = queryObject.id;
  const docRef = await db.collection("lectures").doc(id).update({
    status: "accepted",
  });
  res.send("success");
});
