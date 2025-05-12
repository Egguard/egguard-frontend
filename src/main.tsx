import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { RobotServiceProvider } from "./context/RobotServiceContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RobotServiceProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <JotaiProvider>
            <App />
          </JotaiProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </RobotServiceProvider>
  </StrictMode>
);