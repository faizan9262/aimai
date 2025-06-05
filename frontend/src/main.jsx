import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import axios from "axios";
import { Toaster } from "./components/components/ui/sonner";
import { ChatContextProvider } from "./context/ChatContext";

axios.defaults.baseURL = "https://aimai-backend.vercel.app/api";
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ChatContextProvider>
        <BrowserRouter>
          <App />
          <Toaster position="top-right" />
        </BrowserRouter>
      </ChatContextProvider>
    </AuthProvider>
  </StrictMode>
);
