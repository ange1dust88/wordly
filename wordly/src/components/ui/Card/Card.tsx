import { useState } from 'react';
import './card.scss';

interface Card {
  index: number;
  term: string;
  definition: string;
}

function Card({ index, term, definition }: Card) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`card ${isFlipped ? 'flipped' : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="card__inner">
        <div className="card__front">
          <div className="card__front-cont">
            <h1>{term}</h1>
          </div>
        </div>
        <div className="card__back">
            <div className="card__front-cont">
            <h1>{definition}</h1>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
