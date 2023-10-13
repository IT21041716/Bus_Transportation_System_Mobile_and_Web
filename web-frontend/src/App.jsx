import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SmartCardDashboard from "./it21042560/SmartCardDashboard";
import AdminLogin from "./IT21049590/AdminLogin";
import UserProfile from "./IT21049590/UserProfile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Sajindu */}
          <Route path="/smartcard" element={<SmartCardDashboard />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/userProfile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
