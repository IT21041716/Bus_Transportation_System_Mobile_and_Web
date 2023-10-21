import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Toaster } from "react-hot-toast";
import { checkBalance } from "./IT21041716/actions/topUpAction";
import { isLoggedIn } from "./IT21041716/actions/authAction";

import SmartCardRequest from "./it21042560/SmartCardRequest";
import SmartCardDashboard from "./it21042560/SmartCardDashboard";
import AdminLogin from "./IT21049590/AdminLogin";
import AdminProfile from "./IT21049590/AdminProfile";

import Register from "./IT21041716/scenes/Register";
import UserLogin from "./IT21041716/scenes/UserLogin";
import TopUp from "./IT21041716/scenes/topUp";

import ReservationCancelForm from "./IT21049590/ReservationCancelForm";
import UserJourney from "./IT21049590/UserJourney";
function App() {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.auth.authenticated);
  const user = useSelector((state) => state.auth.user);
  const UID = user ? user.UID : null;

  useEffect(() => {
    if (!authenticated) {
      dispatch(isLoggedIn());
    }
  }, [dispatch, authenticated]);

  useEffect(() => {
    if (UID) {
      dispatch(checkBalance({ UID }));
    }
  }, [dispatch, UID]);

  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={true} />
        <Routes>
          {/* Sajindu */}
          <Route path="/smartcard" element={<SmartCardDashboard />} />
          <Route path="/smartcard/request" element={<SmartCardRequest />} />

          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/adminProfile" element={<AdminProfile />} />

          {/* sithanga */}
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<UserLogin />} />
          <Route path="/topup" element={<TopUp />} />

          <Route path="/resCancel/:id" element={<ReservationCancelForm />} />
          <Route path="/userJourney" element={<UserJourney />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
