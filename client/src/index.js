import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import CodeVerification from "./views/CodeVerification";
import Success from "./views/Success";
import { VerifiedProvider } from "./context/VerificationContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <VerifiedProvider>
        <App />
      </VerifiedProvider>
    </BrowserRouter>
  </React.StrictMode>
);
