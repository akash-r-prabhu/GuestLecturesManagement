import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RoomManagement from "./RoomManagement";
import axios from "axios";
import * as Swal from "sweetalert2";

jest.mock("axios");
jest.mock("sweetalert2");

describe("RoomManagement component", () => {
  test("renders without errors", () => {
    render(<RoomManagement rooms={[]} />);
  });

  test("adds a lecture hall on 'Add Room' button click", async () => {
    render(<RoomManagement rooms={[]} />);

    // Mock the SweetAlert2.fire function
    const mockFire = jest.spyOn(Swal, "fire").mockResolvedValue({
      isConfirmed: true,
      value: {
        name: "Room 1",
        capacity: "50",
        isAirConditioned: "Yes",
        projectorCount: "2",
        speakersCount: "4",
        computersCount: "10",
      },
    });

    // Mock the axios.post function
    const mockPost = jest.spyOn(axios, "post").mockResolvedValue({
      data: "success",
    });

    // Find and click the "Add Room" button
    const addRoomButton = screen.getByText("Add Room");
    fireEvent.click(addRoomButton);

    // Assert that the SweetAlert2.fire function was called with the expected parameters
    expect(mockFire).toHaveBeenCalledWith({
      title: "Enter Lecture Hall Details",
      html: expect.any(String),
      focusConfirm: false,
      preConfirm: expect.any(Function),
    });

    // Wait for the axios.post function to be called
    await Promise.resolve();

    // Assert that the axios.post function was called with the expected parameters
    expect(mockPost).toHaveBeenCalledWith(
      "http://localhost:8001/addLectureHall",
      {
        name: "Room 1",
        capacity: "50",
        isAirConditioned: "Yes",
        projectorCount: "2",
        speakersCount: "4",
        computersCount: "10",
      }
    );

    // Restore the original functions
    mockFire.mockRestore();
    mockPost.mockRestore();
  });

  test("deletes a lecture hall on 'Delete' button click", async () => {
    render(
      <RoomManagement
        rooms={[
          {
            id: 1,
            name: "Room 1",
            capacity: "50",
            isAirConditioned: "Yes",
            projectorCount: "2",
            speakersCount: "4",
            computersCount: "10",
          },
        ]}
      />
    );

    // Mock the SweetAlert2.fire function
    const mockFire = jest.spyOn(Swal, "fire").mockResolvedValue({
      isConfirmed: true,
    });

    // Mock the axios.get function
    const mockGet = jest.spyOn(axios, "get").mockResolvedValue({
      data: "success",
    });

    // Find and click the "Delete" button
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    // Assert that the SweetAlert2.fire function was called with the expected parameters
    expect(mockFire).toHaveBeenCalledWith({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    // Wait for the axios.get function to be called
    await Promise.resolve();

    // Assert that the axios.get function was called with the expected URL
    expect(mockGet).toHaveBeenCalledWith(
      "http://localhost:8001/deleteHall?id=1"
    );

    // Restore the original functions
    mockFire.mockRestore();
    mockGet.mockRestore();
  });
});
