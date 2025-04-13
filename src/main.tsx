import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { RobotServiceProvider } from "./context/RobotServiceContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RobotServiceProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RobotServiceProvider>
  </StrictMode>
);

