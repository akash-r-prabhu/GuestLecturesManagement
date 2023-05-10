import React from "react";
import "./index.css";
import App from "./App";
import { Homepage, ViewLectures } from "./pages";
// react router v5
import {
  BrowserRouter as Router,
  Route,
  Switch, // was Routes
} from "react-router-dom";
import ReactDOM from "react-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/viewLectures">
          <ViewLectures />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>
);
