import { useState } from "react"
import './header.scss'
import { Link } from "react-router-dom";

function Header() {
  const [isLoggedIn, setIsLOggedIn] = useState<boolean>(false);
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

              {isLoggedIn ? (
                  <button className="header__button button">Log out</button>
              ):(

                <Link to='/login' ><button className="header__button button">Sign in &gt;</button></Link>
                  
              )}

          </nav>

        </div>
      </div>
        


    </div>
  )
}

export default Header