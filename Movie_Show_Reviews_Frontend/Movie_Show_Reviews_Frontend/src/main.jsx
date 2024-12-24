import React from "react";
import ReactDOM from "react-dom/client"; // Import ReactDOM from the correct package
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Corrected method to create root and render the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

