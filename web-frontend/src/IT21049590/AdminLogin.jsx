import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Typography, TextField, Button, Container, Grid } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import Navbar from "../IT21041716/scenes/header";
//import "./Journey.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5005/admin/adminSignin",
        {
          email,
          password,
        }
      );

      const data = response.data;

      if (data.token) {
        // Save the token to localStorage or a state management system
        localStorage.setItem("token", data.token);
        console.log("Login successful");
        navigate(`/adminProfile`);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("An error occurred while logging in.");
    }
  };

  return (
    <div className="MainCon1">
    <Container  className="MainCon2" >
      <Navbar />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ marginTop: "100px" }}
      >
        <Grid item>
          <Typography variant="h5">Admin Login</Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: <AccountCircleIcon />,
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: <LockIcon />,
            }}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            style={{ width: "100%" }}
          >
            Login
          </Button>
        </Grid>
        {errorMessage && (
          <Grid item>
            <Typography style={{ color: "red" }}>{errorMessage}</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
    </div>
  );
};

export default AdminLogin;
