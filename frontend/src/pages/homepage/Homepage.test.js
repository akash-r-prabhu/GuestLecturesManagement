import React from "react";
import { render, screen } from "@testing-library/react";
import Homepage from "./Homepage";
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from "react-router-dom";


jest.mock("../../context/StateProvider", () => ({
  useStateValue: jest.fn(),
}));

describe("Homepage", () => {
  test("renders admin dashboard for admin user", () => {
    const user = {
      type: "admin",
    };

    const useStateValueMock = jest.fn(() => [{ user }, jest.fn()]);
    jest.spyOn(require("../../context/StateProvider"), "useStateValue").mockImplementation(useStateValueMock);

    render(
        <Router>
         <Homepage />
        </Router>
    );

    expect(screen.getByText("Lecture Schedule")).toBeInTheDocument();
  });

  test("renders student dashboard for student user", () => {
    const user = {
      type: "student",
    };

    const useStateValueMock = jest.fn(() => [{ user }, jest.fn()]);
    jest.spyOn(require("../../context/StateProvider"), "useStateValue").mockImplementation(useStateValueMock);


    render(
        <Router>
         <Homepage />
        </Router>
    );

    expect(screen.getByText("UPCOMING LECTURES")).toBeInTheDocument();
  });

  test("renders lecturer dashboard for lecturer user", () => {
    const user = {
      type: "lecturer",
    };

    const useStateValueMock = jest.fn(() => [{ user }, jest.fn()]);
    jest.spyOn(require("../../context/StateProvider"), "useStateValue").mockImplementation(useStateValueMock);

    render(
        <Router>
         <Homepage />
        </Router>
    );
    expect(screen.getByText("Lecture Schedule")).toBeInTheDocument();
  });

  test("renders error message for invalid user type", () => {
    const user = {
      type: "invalid",
    };

    const useStateValueMock = jest.fn(() => [{ user }, jest.fn()]);
    jest.spyOn(require("../../context/StateProvider"), "useStateValue").mockImplementation(useStateValueMock);

    render(
        <Router>
         <Homepage />
        </Router>
    );
    expect(screen.getByText("Invalid user type")).toBeInTheDocument();
  });
});
