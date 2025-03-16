import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './cardtemplate.scss'
import { faBars, faImage, faTrash } from '@fortawesome/free-solid-svg-icons'

function CardTemplate() {
  return (
    <div className='cardtemplate'>
        <div className="cardtemplate__header">
            <h3 className="cardtemplate__header-number">1</h3>
            <div className="cardtemplate__header-icons">
              <FontAwesomeIcon icon={faBars}  className="cardtemplate__header-icons-icon"/>
              <FontAwesomeIcon icon={faTrash}  className="cardtemplate__header-icons-icon"/>
            </div>



        </div>
        <div className="cardtemplate__main">

            <div className="cardtemplate__main-block">
              <input type="text" className="cardtemplate__main-block-word" />
              <h3 className="cardtemplate__main-block-title">Term</h3>
            </div>

            <div className="cardtemplate__main-block">
              <input type="text" className="cardtemplate__main-block-definition" />
              <h3 className="cardtemplate__main-block-title">Definition</h3>

            </div>

            <div className="cardtemplate__main-image">
              <FontAwesomeIcon icon={faImage}  className="cardtemplate__main-image-icon"/>
            </div>
            

        </div>
    </div>
  )
}

export default CardTemplate