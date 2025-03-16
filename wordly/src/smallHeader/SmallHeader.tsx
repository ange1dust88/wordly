import { Link } from 'react-router-dom';
import './smallHeader.scss';

interface SmallHeaderProps {
  isBlack: boolean; 
}

const SmallHeader: React.FC<SmallHeaderProps> = ({ isBlack }) => {
  return (
    <div className="smallHeader">
      <div className="wrapper">
        <div className="smallHeader__container container">
          <Link to='/'>
            <p className={`smallHeader__logo ${isBlack ? 'black' : 'white'}`}>
              wordly.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmallHeader;
