import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ClientDetail from "./components/ClientDetail";
import Layout from "./components/Layout";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/client/:id" element={<ClientDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
