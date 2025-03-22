import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './cardtemplate.scss'
import { faArrowDown, faArrowUp, faImage, faTrash } from '@fortawesome/free-solid-svg-icons'

interface CardTemplateProps {
  number: number;
  onDelete: (number: number) => void;
  onMoveUp: (number: number) => void;
  onMoveDown: (number: number) => void;
  isMoveUpDisabled: boolean;
  isMoveDownDisabled: boolean;
  isDeleteDisabled: boolean;
}

function CardTemplate({ number, onDelete, onMoveUp, onMoveDown, isMoveUpDisabled, isMoveDownDisabled,isDeleteDisabled}: CardTemplateProps) {
  const handleDeleteClick = () => {
    if (!isDeleteDisabled) {
      onDelete(number);
    }
  };

  return (
    <div className="cardtemplate">
        <div className="cardtemplate__header">
            <h3 className="cardtemplate__header-number">{number}</h3>
            <div className="cardtemplate__header-icons">
              <FontAwesomeIcon 
                icon={faArrowUp} 
                className={`cardtemplate__header-icons-icon ${isMoveUpDisabled ? 'cardtemplate__header-icons-icon--disabled' : ''}`} 
                onClick={() => !isMoveUpDisabled && onMoveUp(number)} 
              />
              <FontAwesomeIcon 
                icon={faArrowDown} 
                className={`cardtemplate__header-icons-icon ${isMoveDownDisabled ? 'cardtemplate__header-icons-icon--disabled' : ''}`} 
                onClick={() => !isMoveDownDisabled && onMoveDown(number)} 
              />
              <FontAwesomeIcon 
                icon={faTrash} 
                className={`cardtemplate__header-icons-icon ${isDeleteDisabled ? 'cardtemplate__header-icons-icon--disabled' : ''}`} 
                onClick={() => handleDeleteClick()} 
              />
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
              <FontAwesomeIcon icon={faImage} className="cardtemplate__main-image-icon"/>
            </div>
        </div>
    </div>
  )
}

export default CardTemplate
