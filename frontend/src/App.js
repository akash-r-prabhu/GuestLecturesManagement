import { useEffect, useState } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import { useHistory } from "react-router-dom";

import "./App.css";
// import Login from "./components/Login";
import { useStateValue } from "./context/StateProvider";
import { Homepage, ViewLectures, LoginPage } from "./pages";
import {
  BrowserRouter as Router,
  Route,
  Switch, // was Routes
} from "react-router-dom";

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const user = reactLocalStorage.getObject("user");
    if (user) {
      dispatch({
        type: "SET_USER",
        user: user,
      });
    }
  }, [user]);

  return !user ? (
    // <Login />
    <LoginPage />
  ) : (
    <Router>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/viewLectures">
          <ViewLectures />
        </Route>
        {/* if logout path */}
        {/* <Route path="/logout">
          {dispatch({
            type: "LOGOUT",
          })}
          {reactLocalStorage.clear()}
          {<LoginPage />}
        </Route> */}
      </Switch>
    </Router>
  );
}

export default App;
