import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import EmailVerify from "./pages/EmailVerify";
import Navbar from "./components/Navbar";
import UpdatePassword from "./pages/UpdatePassword";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import AllConvos from "./pages/AllConvos";
import About from "./pages/About";
// import PrivateRoute from "./components/PrivateRoute"

const App = () => {
  return (
    <div className="w-full min-h-screen bg-gray-950">
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Singup />} />

        {/* Private Routes */}
        <Route
          path="/new-chat"
          element={
              <Home />
          }
        />
        <Route
          path="/:convoId"
          element={
              <Home />
          }
        />
        <Route
          path="/chats"
          element={
              <AllConvos />
          }
        />
        <Route
          path="/profile"
          element={
              <Profile />
          }
        />
        <Route
          path="/verify-email"
          element={
              <EmailVerify />
          }
        />
        <Route
          path="/reset-password"
          element={
              <ResetPassword />
          }
        />
        <Route
          path="/update-password"
          element={
              <UpdatePassword />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
