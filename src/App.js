

import {  Route, Routes } from "react-router-dom";
import Weather from './Components';
import Home from "./Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Weather" element={<Weather />} />
      <Route path="/Home" element={<Home />} />
    </Routes>
  );
}

export default App;
