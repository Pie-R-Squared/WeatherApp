import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Weather from './Components';
import Home from "./Home";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/Weather" element={<Weather />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
