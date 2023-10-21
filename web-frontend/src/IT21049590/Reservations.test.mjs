import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Reservations from "./Reservations";
import ReservationService from "./services/reservation_service";

jest.mock("./services/reservation_service");

describe("Reservations Page", () => {
  beforeAll(() => {
    ReservationService.getInstance.mockResolvedValue({
      getReservations: jest.fn(),
      createReservation: jest.fn(),
      updateReservation: jest.fn(),
      deleteReservation: jest.fn(),
    });
  });

  it("renders the Reservations page with a table", async () => {
    const mockReservations = [
      {
        _id: "1",
        createdBy: "User1",
        reservedDate: "2023-10-17 14:00:00",
        status: "Active",
        location: "Location1",
      },
      {
        _id: "2",
        createdBy: "User2",
        reservedDate: "2023-10-18 15:00:00",
        status: "Active",
        location: "Location2",
      },
    ];

    ReservationService.getInstance().getReservations.mockResolvedValue(
      mockReservations
    );

    render(<Reservations />);

    // You can use screen queries to check if the page components are rendered correctly
    const table = screen.getByRole("table");
    const tableRows = screen.getAllByRole("row");
    expect(table).toBeInTheDocument();
    expect(tableRows).toHaveLength(mockReservations.length + 1); // Add 1 for the header row
  });

  it("opens the Add Reservation modal when the 'Add Reservation' button is clicked", async () => {
    const mockReservations = [];
    ReservationService.getInstance().getReservations.mockResolvedValue(
      mockReservations
    );

    render(<Reservations />);

    // Find the 'Add Reservation' button and click it
    const addReservationButton = screen.getByRole("button", {
      name: "Add Reservation",
    });
    fireEvent.click(addReservationButton);

    // Check if the Add Reservation modal is displayed
    await waitFor(() => {
      const addReservationModal = screen.getByText("Add Reservation");
      expect(addReservationModal).toBeInTheDocument();
    });
  });

  // Add more test cases as needed

  // Cleanup mock implementation after all tests
  afterAll(() => {
    jest.resetAllMocks();
  });
});
