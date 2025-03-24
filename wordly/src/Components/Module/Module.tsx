import { Link } from 'react-router-dom';
import './module.scss';

interface Card {
  term: string;
  definition: string;
}

interface ModuleTypes {
  title: string;
  description: string;
  creatorName: string;
  cards: Card[];
  code: string;
}

function Module({ title, description, creatorName, cards, code }: ModuleTypes) {
  const numberOfCards = cards.length;
  return (
    <Link 
      to={`/module-detail/${code}`} 
      className="module"
    >
      <div className="module__top">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="module__bottom">
        <p>{creatorName}</p>
        <p>{numberOfCards} words</p>
      </div>
    </Link>
  );
}

export default Module;
