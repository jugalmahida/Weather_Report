import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./componnets/Login";
import Register from "./componnets/Registration";
import Dashboard from "./componnets/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
