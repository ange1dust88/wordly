import { useState } from 'react';
import './card.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

interface Card {
  index: number;
  term: string;
  definition: string;
}

function Card({ term, definition }: Card) {
  const [isFlipped, setIsFlipped] = useState(false);

  const speakTerm = (term: string) => {
    const utterance = new SpeechSynthesisUtterance(term);
    speechSynthesis.speak(utterance);
  };

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();  
    speakTerm(term); 
  };

  return (
    <div
      className={`card ${isFlipped ? 'flipped' : ''}`}
      onClick={() => { setIsFlipped(!isFlipped) }}
    >
      <div className="card__inner">
        <div className="card__front">
          <div className="card__front-cont">
            <FontAwesomeIcon
              icon={faVolumeHigh}
              className='card__front-cont-icon'
              onClick={handleIconClick} 
            />
            <h1 className="card__front-cont-text">{term}</h1>
          </div>
        </div>
        <div className="card__back">
          <div className="card__back-cont">
            <FontAwesomeIcon
              icon={faVolumeHigh}
              className='card__back-cont-icon'
              onClick={(e) => { 
                e.stopPropagation(); 
                speakTerm(definition); 
              }}
            />
            <h1 className="card__front-cont-text">{definition}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
