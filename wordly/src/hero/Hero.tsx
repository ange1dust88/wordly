import Header from '../header/Header'
import './hero.scss'
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
                          <button className='button button--black'>Start now &gt;</button>
                          <button className='button hero__left-buttons-button'>Contact us &gt;</button>
                      </div>
                  </div>

                  <div className="hero__right">
                      <img src="example.png" alt="" />
                  </div>

              </div>
          </div>
          
      </div>
    </>
    
  )
}

export default Hero