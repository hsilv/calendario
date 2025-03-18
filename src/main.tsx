import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.tsx";
import { CalendarProvider } from "./context/Calendar/calendarContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CalendarProvider>
      <App />
    </CalendarProvider>
  </StrictMode>
);
