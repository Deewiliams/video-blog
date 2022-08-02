// import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from "./Container/Login";
import Home from "./Container/Home";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;
