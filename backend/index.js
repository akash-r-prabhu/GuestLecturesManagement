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

// app.get("/lectureList", async function (req, res) {
//   const lectures = [];

//   db.collection("lectures").onSnapshot((snapshot) => {
//     lectures.length = 0;

//     snapshot.forEach((doc) => {
//       lectures.push(doc.data());
//     });

//     res.send(lectures);
//   });
// });
app.get("/lectureList", async function (req, res) {
  const lectures = [];

  // Set up a listener for real-time updates
  const unsubscribe = db.collection("lectures").onSnapshot((snapshot) => {
    lectures.length = 0; // Clear the array before updating

    snapshot.forEach((doc) => {
      lectures.push(doc.data());
    });

    // Send the updated lectures
    res.send(lectures);

    // Detach the listener
    unsubscribe();
  });
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

  try {
    const docRef = await db.collection("users").add(user);
    if (docRef.id) {
      res.send("success");
    } else {
      res.send("User not added");
    }
  } catch (error) {
    console.log(error);
    res.send("Error occurred");
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

  // Set up a listener for real-time updates
  const unsubscribe = db.collection("lectureHalls").onSnapshot((snapshot) => {
    lectureHalls.length = 0; // Clear the array before updating

    snapshot.forEach((doc) => {
      const data = doc.data();
      lectureHalls.push({
        id: doc.id,
        name: data.name,
        capacity: data.capacity,
      });
    });

    // Send the updated lecture halls
    res.send(lectureHalls);
    unsubscribe();
  });
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

  // Set up a listener for real-time updates
  db.collection("users")
    .where("type", "==", "lecturer")
    .where("status", "==", "pending")
    .onSnapshot((snapshot) => {
      lecturerRequests.length = 0; // Clear the array before updating

      snapshot.forEach((doc) => {
        const data = doc.data();
        lecturerRequests.push({
          id: doc.id,
          name: data.name,
          email: data.email,
          dob: data.dob,
          type: data.type,
          status: data.status,
        });
      });

      // Send the updated lecturer requests
      res.send(lecturerRequests);
    });
});

app.get("/lecturerList", async function (req, res) {
  const lecturerList = [];

  // Set up a listener for real-time updates
  const unsubscribe = db
    .collection("users")
    .where("type", "==", "lecturer")
    .onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        lecturerList.push({
          id: doc.id,
          name: data.name,
          email: data.email,
          dob: data.dob,
          type: data.type,
          status: data.status,
        });
      });

      // Send the updated lecturer list
      res.send(lecturerList);
      unsubscribe();
    });
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
  const docRef = await db
    .collection("lectures")
    .doc(id)
    .update({
      status: "accepted",
    })
    .then((docRef) => {
      res.send("success");
    })
    .catch((error) => {
      res.send("error");
    });
});

// app.get("/lecturesForLecturer", async function (req, res) {
//   const queryObject = url.parse(req.url, true).query;
//   const lecturer = queryObject.lecturer;
//   const lectures = [];

//   db.collection("lectures")
//     .where("lecturer", "==", lecturer)
//     .where("status", "==", "pending")
//     .onSnapshot((snapshot) => {
//       snapshot.forEach((doc) => {
//         const data = doc.data();
//         lectures.push({
//           id: doc.id,
//           title: data.title,
//           date: data.date,
//           time: data.time,
//           lectureHall: data.lectureHall,
//           lecturer: data.lecturer,
//           status: data.status,
//         });
//       });

//       res.send(lectures);
//     });
// });
app.get("/lecturesForLecturer", async function (req, res) {
  const queryObject = url.parse(req.url, true).query;
  const name = queryObject.name;
  const lectures = [];

  const unsubscribe = db
    .collection("lectures")
    .where("lecturer", "==", name)
    .onSnapshot((snapshot) => {
      lectures.length = 0; // Clear the array before updating

      snapshot.forEach((doc) => {
        const data = doc.data();
        lectures.push({
          id: doc.id,
          title: data.title,
          date: data.date,
          time: data.time,
          lectureHall: data.lectureHall,
          lecturer: data.lecturer,
          status: data.status,
        });
      });

      // Send the updated lecturer list
      res.send(lectures);
      unsubscribe();
    });
});
// sample url http://localhost:8001/lecturesForLecturer?name=Kamal

app.get("/lecturesForStudent", async function (req, res) {
  const queryObject = url.parse(req.url, true).query;
  const name = queryObject.name;
  const lectures = [];

  const unsubscribe = db

    .collection("lectures")
    .where("status", "==", "accepted")

    .onSnapshot((snapshot) => {
      lectures.length = 0; // Clear the array before updating

      snapshot.forEach((doc) => {
        const data = doc.data();
        lectures.push({
          id: doc.id,
          title: data.title,
          date: data.date,
          time: data.time,
          lectureHall: data.lectureHall,
          lecturer: data.lecturer,
          status: data.status,
        });
      });

      // Send the updated lecturer list
      res.send(lectures);
      unsubscribe();
    });
});
// sample url http://localhost:8001/lecturesForStudent?name=Kamal

app.get("/acceptLectureRequest", async function (req, res) {
  const queryObject = url.parse(req.url, true).query;
  const id = queryObject.id;
  const docRef = await db.collection("lectures").doc(id).update({
    status: "accepted",
  });
  res.send("success");
});

app.get("/registerForLecture", async function (req, res) {
  const queryObject = url.parse(req.url, true).query;
  const docId = queryObject.docId;
  const studentName = queryObject.name;
  const docRef = await db
    .collection("lectures")
    .doc(docId)
    .collection("students")
    .doc(studentName)
    .set({
      name: studentName,
    })
    .then((docRef) => {
      res.send("success");
    })
    .catch((error) => {
      res.send("error");
    });
});

// sample url http://localhost:8001/registerForLecture?docId=1&name=Kamal
app.listen(8001, function () {
  console.log("CORS-enabled web server listening on port 8001");
});
