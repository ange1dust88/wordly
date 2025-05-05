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
        </Routes>
      </Router>
    </>
  );
}

export default App;

//todo



// loader(done)
// memo fix (done)
// login via github   (done)
// add prime and balance to user (done)
// card fix (done)
// test fix (done)
// gui fixes (done)
// popular questions(done)


// state managing (zustand) (done for def login )
// writing author nickname when creating a module (done for def login )

// screen for authors finish (done)
// search modules    

// library page (half done)

// payment
// premium users

// alerts after login/creating account etc 