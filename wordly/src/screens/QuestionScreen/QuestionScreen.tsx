import { useLocation, useNavigate } from 'react-router-dom';
import './questionscreen.scss';
import Mainheader from '@/components/Mainheader/Mainheader';

function QuestionScreen() {
  const location = useLocation(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className='questionscreen'>
      <Mainheader logout={handleLogout} />
      <div className="questionscreen__content">
        <h2 className='questionscreen__content-title'>{location.state?.title || 'No article selected'}</h2>
        <div className='questionscreen__content-text' 
             dangerouslySetInnerHTML={{ __html: location.state?.content || '' }} />
        <img src={location.state?.image} alt={location.state?.title} className="questionscreen__content-image" />
      </div>
    </div>
  );
}

export default QuestionScreen;
