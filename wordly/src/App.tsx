import Login from './auth/login/Login';
import Register from './auth/register/Register';
import Dashboard from './dashboard/Dashboard';
import Hero from './hero/Hero'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ModuleDetail from './ModuleDetail/ModuleDetail';
import CardMode from './CardMode/CardMode'; 
import TestMode from './TestMode/TestMode';
import MemorizingMode from './MemorizingMode/MemorizingMode';

function App() {
  return (
    <>
    <Router>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/module-detail/:code" element={<ModuleDetail />} />
          <Route path="/module-detail/:code/cardMode" element={<CardMode />} /> 
          <Route path="/module-detail/:code/testMode" element={<TestMode />} /> 
          <Route path="/module-detail/:code/memorizingMode" element={<MemorizingMode />} /> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
