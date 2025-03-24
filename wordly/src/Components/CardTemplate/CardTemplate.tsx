import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './cardtemplate.scss'
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface CardTemplateProps {
  number: number;
  term: string;
  definition: string;
  onDelete: () => void;
  onUpdate: (field: 'term' | 'definition' , value: string) => void;
}

function CardTemplate({ number, term, definition, onDelete, onUpdate }: CardTemplateProps) {
  return (
    <div className="cardtemplate">
      <div className="cardtemplate__header">
        <h3>{number}</h3>
        <FontAwesomeIcon icon={faTrash} className="cardtemplate__header-icon" onClick={onDelete}/>

      </div>
      <div className="cardtemplate__main">
        <div className="cardtemplate__main-block">
          <input
            type="text"
            className='cardtemplate__main-block-word'
            value={term}
            onChange={(e) => onUpdate('term', e.target.value)}
          />
          <h3 className="cardtemplate__main-block-title">Term</h3>
        </div>
        <div className="cardtemplate__main-block">
          <input
            type="text"
            className='cardtemplate__main-block-word'
            value={definition}
            onChange={(e) => onUpdate('definition', e.target.value)}
          />
          <h3 className="cardtemplate__main-block-title">Definition</h3>
        </div>
      </div>
    </div>
  );
}

export default CardTemplate;