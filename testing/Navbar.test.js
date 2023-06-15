import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar";
import { useStateValue } from "../../context/StateProvider";
import '@testing-library/jest-dom/extend-expect';
import * as Swal from "sweetalert2";

jest.mock("sweetalert2");
jest.mock("../../context/StateProvider");

describe("Navbar component", () => {
  const mockLogout = jest.fn();

  beforeEach(() => {
    useStateValue.mockReturnValue([
      {
        user: {
          name: "John Doe",
        },
      },
    ]);
  });

  test("should render correctly", () => {
    render(
      <Router basename="/">
        <Navbar />
      </Router>
    );

    // Assert that the Navbar renders correctly
    const homeLink = screen.getByText("HOME");
    expect(homeLink).toBeInTheDocument();

    const lecturesLink = screen.getByText("LECTURES");
    expect(lecturesLink).toBeInTheDocument();

    const feedbackLink = screen.getByText("FEEDBACK");
    expect(feedbackLink).toBeInTheDocument();

    const contactLink = screen.getByText("CONTACT");
    expect(contactLink).toBeInTheDocument();

    // ...
  });



  test("calls logout function when clicking on 'LOG OUT'", async () => {
    const mockDispatch = jest.fn();

    useStateValue.mockReturnValue([
      {
        user: {
          name: "John Doe",
        },
      },
      mockDispatch,
    ]);

    render(
        <Router basename="/">
          <Navbar />
        </Router>
      );

    // Assert that the user name is displayed
    //expect(screen.getByText("John Doe")).toBeInTheDocument();

    // Mock the SweetAlert2.fire function
    const mockFire = jest.spyOn(Swal, "fire").mockResolvedValue({
      value: true,
      dismiss: Swal.DismissReason.cancel,
    });

    // Find and click the "LOG OUT" element
    const logoutButton = screen.getByText("LOG OUT");
    fireEvent.click(logoutButton);

    // Assert that the SweetAlert2.fire function was called with the expected parameters
    expect(mockFire).toHaveBeenCalledWith({
      iconColor: "red",
      title: "Are you sure?",
      text: "You want to logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout!",
      cancelButtonText: "No, cancel!",
    });


    // Restore the original SweetAlert2.fire function
    mockFire.mockRestore();
  });

  // ...
});
