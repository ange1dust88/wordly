
import Header from '@/components/header/Header'
import './hero.scss'
import { Link } from 'react-router-dom'
function Hero() {
  
  return (
    <>
    <Header/>
      <div className="hero">
          <div className="wrapper">
          <div className="hero__container container">
                  <div className="hero__left">
                      <h1 className="hero__left-title">Unlock your English potential with Wordly</h1>
                      <h3 className="hero__left-description">Master English vocabulary with Wordly – the ultimate tool for language learners. Empower your language journey with personalized flashcards and quizzes!"</h3>

                      <div className="hero__left-buttons">
                          <Link to ='/login'><button className='button button--black'>Start now &gt;</button></Link>
                      </div>
                  </div>

                  <div className="hero__right">
                      <img src="frame.png" alt="" />
                  </div>

              </div>
          </div>
          
      </div>
    </>
    
  )
}

export default Hero