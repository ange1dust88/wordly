import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useModuleStore from '../Stores/useModuleStore';
import { useAuthStore } from '../Stores/useAuthStore';
import './memorizingmode.scss';
import LearningCard from '@/components/ui/LearningCard/LearningCard';
import Result from '@/components/ui/Result/Result';

interface CardTypes {
  term: string;
  definition: string;
}

interface ModuleTypes {
  title: string;
  description: string;
  creator_name: string;
  cards: CardTypes[];
  code: string;
}

function MemorizingMode() {
  const { code } = useParams();  
  const { modules } = useModuleStore();
  const [moduleData, setModuleData] = useState<ModuleTypes | null>(null); 
  const [currentCardIndex, setCurrentCardIndex] = useState(0);  
  const { accessToken, isLoading, logout } = useAuthStore();
  const [showResult, setShowResult] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logging out...');
    logout();
    console.log('Logged out, navigating to login...');
    navigate('/login');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    if (code) {
      const moduleFromStore = modules.find((module) => module.code === code);
      
      if (moduleFromStore) {
        setModuleData(moduleFromStore);
      } else {
        fetchModuleDataFromAPI(code); 
      }
    }
  }, [code, modules]);

  const fetchModuleDataFromAPI = async (code: string) => {
    try {
      const token = accessToken;
      const response = await fetch(`http://127.0.0.1:8000/modules/${code}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setModuleData(data);  
      } else {
        console.error('Error fetching module data');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  if (!moduleData || !moduleData.cards || moduleData.cards.length === 0) {
    return <div>Loading...</div>;  
  }

  const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const getRandomIncorrectOptions = (correctTerm: string) => {
    const wrongVariants = moduleData.cards.filter(card => card.term !== correctTerm);
    const selectedWrongVariants = shuffleArray(wrongVariants).slice(0, 3);
    return selectedWrongVariants;
  };

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => prevIndex + 1);  
  };

  const updateAnswerCount = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);  
    } else {
      setWrongAnswers(prev => prev + 1);    
    }
  };

  const handleRestart = () => {
    setShowResult(false);
    setCurrentCardIndex(0);
  }

  const currentCard = moduleData.cards[currentCardIndex];
  const wrongVariants = getRandomIncorrectOptions(currentCard.term);
  const options = shuffleArray([currentCard, ...wrongVariants]);

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div className="dashboard__header-left">
          <Link to='/dashboard' className="dashboard__header-left-logo"> Wordly.</Link>
        </div>
        <div className="dashboard__header-right">
          <button className="dashboard__header-right-button" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>

      <div className="memorizing">
      {showResult ? (
            <Result 
            known={correctAnswers} 
            unknown={wrongAnswers} 
            onRestart={handleRestart} />
        ) : ( 
        currentCardIndex + 1 === moduleData.cards.length ? (
            <LearningCard 
                term={currentCard.term} 
                definition={currentCard.definition} 
                options={options} 
                next={() => setShowResult(true)} 
                updateAnswerCount = {updateAnswerCount}
            />
        ) : (
            <LearningCard 
                term={currentCard.term} 
                definition={currentCard.definition} 
                options={options} 
                next={nextCard}  
                updateAnswerCount={updateAnswerCount}
            />
        )
        )}


        
      </div>
    </div>
  );
}

export default MemorizingMode;
