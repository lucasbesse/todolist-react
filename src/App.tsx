import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AboutUs from './components/AboutUs/AboutUs';
import Home from "./components/Home/Home";
import TopBar from './components/TopBar/TopBar';

function App() {
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
