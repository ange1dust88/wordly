import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import './cancel.scss'
import { Link } from 'react-router-dom'

function Cancel() {
  return (
    <div className='cancel'>
      <div className="cancel__container">
        <FontAwesomeIcon icon={faCircleXmark} className="cancel__icon" />
        <h1 className="cancel__title">Oops!</h1>
        <h2 className="cancel__subtitle">Payment Failed</h2>     
        <p className="cancel__description">
          Something went wrong while processing your payment.<br/>
          Please try again or contact support.
        </p>
        <Link to='/dashboard'>
          <button className="cancel__button">Home</button>
        </Link>
      </div>
    </div>
  )
}

export default Cancel
