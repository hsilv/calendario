import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import { CalendarTemplate } from "./components/Templates/CalendarTemplate";

function App() {
  return (
    <Router basename="/vialto">
      <Routes>
        <Route path="/" element={<CalendarTemplate />} />
        <Route path="/admin" element={<div>Página de Administrador</div>} />
      </Routes>
    </Router>
  );
}

export default App;
