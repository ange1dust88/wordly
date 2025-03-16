
import Login from './auth/login/Login';
import Register from './auth/register/Register';
import Dashboard from './dashboard/Dashboard';
import Hero from './hero/Hero'
import './index.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <Router>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;


{

  /*
  сделал: ошибки оформить,  имя добавить к логину
  первые страницы: запомнить меня реализовать, показывать залогинен ли пользователь на главной

  программа: подключить shadcn + tailwind,  сделать главную страницу ,подлючить дб 
  
  */
}