import { useNavigate } from 'react-router-dom';
import './question.scss';

interface QuestionType {
  title: string;
  image: string;
  content: string;
}

function Question({ title, image, content }: QuestionType) {
  
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/question', { state: { title, image, content } });
  };

  return (
    <div onClick={handleClick} className="question">
      <h2 className='question__title'>{title}</h2>
    </div>
  );
}

export default Question;
