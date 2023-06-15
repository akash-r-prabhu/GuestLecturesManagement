import React from "react";
import { render, screen } from "@testing-library/react";
import StudentDashboard from "./StudentDashboard";
import '@testing-library/jest-dom/extend-expect';

// Mock the Navbar component
jest.mock("../../components/navBar/NavBar", () => () => <div>Mocked Navbar</div>);

describe("StudentDashboard", () => {
  test("renders navbar", () => {
    render(<StudentDashboard />);
    expect(screen.getByText("Mocked Navbar")).toBeInTheDocument();
  });

  test("renders upcoming lecture information", () => {
    render(<StudentDashboard />);
    expect(
      screen.getByText("PYTHON LIBRARIES")
    ).toBeInTheDocument();
    expect(
      screen.getByText("27/05/2023 12:00 noon")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "In the Python libraries lecture, we can learn about the vast ecosystem of libraries available to Python developers and how they can significantly enhance our programming capabilities"
      )
    ).toBeInTheDocument();
  });

  test("renders guest lecturer information", () => {
    render(<StudentDashboard />);
    expect(
      screen.getByText("OUR GUEST LECTURERS")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        '"Celebrating a constellation of brilliant minds who inspire, educate, and transform. Join us as we unlock a universe of knowledge with our esteemed guest lecturers."'
      )
    ).toBeInTheDocument();
  });

  test("renders announcements", () => {
    render(<StudentDashboard />);
    expect(
      screen.getByText(
        "📢 Exciting Update: Guest Lecture System Revamped! New features include seamless registration, interactive Q&A sessions, and enhanced speaker profiles. Join us for an enhanced lecture experience!"
      )
    ).toBeInTheDocument();
  });

  test("renders important dates", () => {
    render(<StudentDashboard />);
    expect(
      screen.getByText(
        "Registered for Entrepreneurship: A lifetime of rewards, on 5th Dec"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Registered for Digital Disruption and its Impact, exam on 2nd Dec"
      )
    ).toBeInTheDocument();
  });

  // ...rest of the tests
});
