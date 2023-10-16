// ReservationCancelForm.jsx

import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const ReservationCancelForm = ({ reservationId, onCancel }) => {
  const [reason, setReason] = useState("");
  const [state, setState] = useState("pending");

  const handleCancel = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5005/reservation-cancels",
        {
          reservationId,
          reason,
          state,
        }
      );

      // Handle response as needed, e.g., show success message or navigate to a different page
      console.log(response.data);

      // Close the modal after successful cancellation
      onCancel();
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel htmlFor="reason">Cancellation Reason</InputLabel>
        <TextField
          id="reason"
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel htmlFor="state">Cancellation State</InputLabel>
        <Select
          label="Cancellation State"
          id="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <MenuItem value="accepted">Accepted</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleCancel}>
        Cancel Reservation
      </Button>
    </div>
  );
};

export default ReservationCancelForm;
