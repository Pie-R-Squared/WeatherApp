import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Weather from './Components';
import Main from "./Main";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Weather />} />
        <Route path="/Main" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
