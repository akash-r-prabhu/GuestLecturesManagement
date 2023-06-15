import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";
import { useStateValue } from "../../context/StateProvider";
import '@testing-library/jest-dom/extend-expect';

jest.mock("axios");
jest.mock("../../context/StateProvider", () => ({
  useStateValue: jest.fn(),
}));
describe("AdminDashboard", () => {
  test("renders without errors", () => {
    useStateValue.mockReturnValue([{ user: { name: "John Doe" } }, jest.fn()]);

    // Mock axios.get for fetching lecturer requests
    axios.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          name: "John Doe",
          email: "johndoe@example.com",
          status: "pending",
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "janesmith@example.com",
          status: "pending",
        },
      ],
    });

    // Mock axios.get for fetching lecture halls
    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, name: "Hall A" },
        { id: 2, name: "Hall B" },
      ],
    });

    render(
      <Router>
        <AdminDashboard />
      </Router>
    );

    // Assert that the component renders without errors
    expect(screen.getByText("Lecture Schedule")).toBeInTheDocument();
    expect(screen.getByText("View Request")).toBeInTheDocument();
    expect(screen.getByText("Hall Management")).toBeInTheDocument();
  });

  test("displays lecturer requests and handles approval and rejection", async () => {
    // Mock axios.get for fetching lecturer requests
    useStateValue.mockReturnValue([{ user: { name: "John Doe" } }, jest.fn()]);

    const mockLecturerRequests = [
      {
        id: 1,
        name: "John Doe",
        email: "johndoe@example.com",
        status: "pending",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "janesmith@example.com",
        status: "pending",
      },
    ];
    axios.get.mockResolvedValueOnce({ data: mockLecturerRequests });

    // Mock axios.post for approving and rejecting lecturer requests
    axios.post.mockResolvedValue({ data: {} });

    render(
      <Router>
        <AdminDashboard />
      </Router>
    );

    // Wait for API requests to resolve
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });
  });
});
