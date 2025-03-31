import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import { CalendarTemplate } from "./components/Templates/CalendarTemplate";
import { EventTemplate } from "./components/Templates/EventTemplate";
import { PmtCalendarTemplate } from "./components/Templates/CalendarTemplate/pmt";
import { PmtEventTemplate } from "./components/Templates/EventTemplate/pmt";

function App() {
  return (
    <Router basename="/calendario">
      <Routes>
        <Route path="/" element={<CalendarTemplate />} />
        <Route path="/admin" element={<div>Página de Administrador</div>} />
        <Route path="/evento/:id" element={<EventTemplate />} />
        <Route path="/pmt" element={<PmtCalendarTemplate />} />
        <Route path="/pmt/evento/:id" element={<PmtEventTemplate />} />
      </Routes>
    </Router>
  );
}

export default App;
