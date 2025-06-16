import Login from './screens/auth/login/Login';
import Register from './screens/auth/register/Register';
import Dashboard from './screens/dashboard/Dashboard';
import Hero from './screens/hero/Hero'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ModuleDetail from './screens/ModuleDetail/ModuleDetail';
import TestMode from './screens/Modes/TestMode/TestMode';
import CardMode from './screens/Modes/CardMode/CardMode';
import MemorizingMode from './screens/Modes/MemorizingMode/MemorizingMode';
import QuestionScreen from './screens/QuestionScreen/QuestionScreen';
import AuthorPage from './screens/AuthorPage/AuthorPage';
import Success from './screens/Success/Success';
import Cancel from './screens/Cancel/Cancel';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/question" element={<QuestionScreen />} />
          <Route path="/module-detail/:code" element={<ModuleDetail />} />
          <Route path="/module-detail/:code/cardMode" element={<CardMode />} /> 
          <Route path="/module-detail/:code/testMode" element={<TestMode />} /> 
          <Route path="/module-detail/:code/memorizingMode" element={<MemorizingMode />} /> 
          <Route path="/profile/:author" element={<AuthorPage />} />
          <Route path="/success" element={<Success />} />
          <Route path="/fail" element={<Cancel />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;

