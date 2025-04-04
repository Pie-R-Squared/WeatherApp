import {  Route, Routes } from "react-router-dom";
import Weather from './Components';
import Home from "./Home";
import RoutePlanner from "./route";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Weather" element={<Weather />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/route" element={<RoutePlanner />} />
    </Routes>
  );
}

export default App;
