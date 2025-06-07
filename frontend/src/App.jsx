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
import PrivateRoute from "./components/PrivateRoute"

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
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/:convoId"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/chats"
          element={
            <PrivateRoute>
              <AllConvos />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <PrivateRoute>
              <EmailVerify />
            </PrivateRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PrivateRoute>
              <ResetPassword />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-password"
          element={
            <PrivateRoute>
              <UpdatePassword />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
