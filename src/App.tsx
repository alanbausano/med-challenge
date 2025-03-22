import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ClientDetail from "./components/ClientDetail";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/client/:id" element={<ClientDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
