import './header.scss';
import { Link } from "react-router-dom";


function Header() {

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
            <Link to='/login'>
              <button className="header__button button">Sign in &gt;</button>
            </Link>
          
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
