import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import { CalendarTemplate } from "./components/Templates/CalendarTemplate";
import { EventTemplate } from "./components/Templates/EventTemplate";

function App() {
  return (
    <Router basename="/vialto">
      <Routes>
        <Route path="/" element={<CalendarTemplate />} />
        <Route path="/admin" element={<div>Página de Administrador</div>} />
        <Route path="/evento/:id" element={<EventTemplate />} />
      </Routes>
    </Router>
  );
}

export default App;
