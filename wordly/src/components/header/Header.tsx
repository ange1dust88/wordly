import { useAuthStore } from '@/Stores/useAuthStore';
import './header.scss';
import { Link, useNavigate } from "react-router-dom";


function Header() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/dashboard'); 
  };

  return (
    <div className="header">
      <div className="wrapper">
        <div className="header__container container">
          <Link to='/'>
            <p className='header__logo'>
              wordly.
            </p>
          </Link>

          <nav className="header__navs">
            <a href="" className="header__navs-nav">page1</a>
            <a href="" className="header__navs-nav">page2</a>
            <a href="" className="header__navs-nav">page3</a>

            {isAuthenticated ? (
              <button className="header__button button" onClick={handleLogout}>Go to app</button>
            ) : (
              <Link to='/login'>
                <button className="header__button button">Sign in &gt;</button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
