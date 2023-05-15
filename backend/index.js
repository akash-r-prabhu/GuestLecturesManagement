var http = require("http");
var url = require("url");
var fs = require("fs");
// import exports.db from backend/firebase.js
var db = require("./firebase.js").db;
var express = require("express");
var cors = require("cors");
var app = express();

app.use(cors());

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
