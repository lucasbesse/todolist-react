import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AboutUs from './components/AboutUs/AboutUs';
import Home from "./components/Home/Home";
import Table from './components/Table/Table';
import TopBar from './components/TopBar/TopBar';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const produtos = [
    {
      name: "Produto A",
      created_at: new Date('2023-01-01'),
      price: 50.00
    },
    {
      name: "Produto B",
      created_at: new Date('2023-02-15'),
      price: 120.99
    },
    {
      name: "Produto C",
      created_at: new Date('2023-03-10'),
      price: 75.50
    },
    {
      name: "Produto D",
      created_at: new Date('2022-11-20'),
      price: 40.00
    },
    {
      name: "Produto E",
      created_at: new Date('2023-04-05'),
      price: 150.75
    },
    {
      name: "Produto F",
      created_at: new Date('2023-03-30'),
      price: 99.99
    }
  ];
  
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<AboutUs />} />
        <Route path="/table" element={<Table produtcs={produtos} />} />
      </Routes>
    </Router>
  );
}

export default App;
