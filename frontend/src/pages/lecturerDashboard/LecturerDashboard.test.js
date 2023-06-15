import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import LecturerDashboard from "./LecturerDashboard";
import '@testing-library/jest-dom/extend-expect';
jest.mock("../../context/StateProvider", () => ({
  useStateValue: jest.fn(),
}));

describe("LecturerDashboard", () => {
  test("renders Navbar component", () => {
    useStateValue.mockReturnValue([{ user: { name: "John Doe" } }, jest.fn()]);

    render(
      <Router>
        <LecturerDashboard />
      </Router>
    );

    const navbarComponent = screen.getByTestId("navbar");
    expect(navbarComponent).toBeInTheDocument();
  });

  test("renders Lecture Schedule card", () => {
    useStateValue.mockReturnValue([{ user: { name: "John Doe" } }, jest.fn()]);

    render(
      <Router>
        <LecturerDashboard />
      </Router>
    );

    const lectureScheduleCard = screen.getByText("Lecture Schedule");
    expect(lectureScheduleCard).toBeInTheDocument();

    const lectureScheduleLink = screen.getByRole("link", {
      name: "Lecture Schedule",
    });
    expect(lectureScheduleLink).toHaveAttribute("href", "/viewLectures");
  });

  test("renders View Feedback card", () => {
    useStateValue.mockReturnValue([{ user: { name: "John Doe" } }, jest.fn()]);

    render(
      <Router>
        <LecturerDashboard />
      </Router>
    );

    const viewFeedbackCard = screen.getByText("View Feedback");
    expect(viewFeedbackCard).toBeInTheDocument();

    const viewFeedbackLink = screen.getByRole("link", { name: "View Feedback" });
    expect(viewFeedbackLink).toHaveAttribute("href", "/feedback");
  });

  test("renders font-awesome stylesheet link", () => {
    useStateValue.mockReturnValue([{ user: { name: "John Doe" } }, jest.fn()]);

    render(
      <Router>
        <LecturerDashboard />
      </Router>
    );
    const fontAwesomeLink = screen.getByTestId("fontLink");                 
    expect(fontAwesomeLink).toBeInTheDocument();
    expect(fontAwesomeLink).toHaveAttribute("rel", "stylesheet");
  });
});
