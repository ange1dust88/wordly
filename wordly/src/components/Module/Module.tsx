import { Link } from 'react-router-dom';
import './module.scss';

interface ModuleTypes {
  title: string;
  description: string;
  creatorName?: string;
  code: string;
}

function Module({ title, description, creatorName, code }: ModuleTypes) {
  return (
    <Link 
      to={`/module-detail/${code}`} 
      className="module"
    >
      <div className="module__top">
        <h2 className='module__top-title'>{title}</h2>
        <p className='module__top-description'>{description}</p>
      </div>
      <div className="module__bottom">
        {creatorName ? (
          <p>{creatorName}</p>
        ):(
          <></>
        )}
      </div>
    </Link>
  );
}

export default Module;
