// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { Button, TextField, Typography, Box, Paper } from "@mui/material";
// import LockIcon from "@mui/icons-material/Lock";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

// const AdminLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post("http://localhost:8080/user/login", {
//         email,
//         password,
//       });

//       const data = response.data;

//       if (data.status) {
//         // Login successful, you can navigate to the user's dashboard or perform other actions here.
//         console.log("Login successful");

//         navigate(`/userProfile`);
//       } else {
//         setErrorMessage(data.message);
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//       setErrorMessage("An error occurred while logging in.");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "100vh",
//       }}
//     >
//       <Paper
//         elevation={3}
//         sx={{
//           width: "300px",
//           padding: "20px",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <LockIcon color="primary" sx={{ fontSize: 40, marginBottom: 2 }} />
//         <Typography variant="h5" gutterBottom>
//           Login
//         </Typography>
//         {errorMessage && (
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               color: "error.main",
//               marginBottom: 2,
//             }}
//           >
//             <ErrorOutlineIcon sx={{ marginRight: 1 }} />
//             {errorMessage}
//           </Box>
//         )}
//         <TextField
//           type="email"
//           label="Email"
//           variant="outlined"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           sx={{ marginBottom: 2, width: "100%" }}
//         />
//         <TextField
//           type="password"
//           label="Password"
//           variant="outlined"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           sx={{ marginBottom: 2, width: "100%" }}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleLogin}
//           sx={{ width: "100%" }}
//         >
//           Login
//         </Button>
//         <br></br>
//         <Link to="/signup">
//           <Button variant="contained" color="primary" sx={{ width: "100%" }}>
//             Signup
//           </Button>
//         </Link>
//       </Paper>
//     </Box>
//   );
// };

// export default AdminLogin;
