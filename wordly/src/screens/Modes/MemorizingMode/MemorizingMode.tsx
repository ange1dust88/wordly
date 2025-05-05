import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './memorizingmode.scss';
import LearningCard from '@/components/LearningCard/LearningCard';
import Result from '@/components/Result/Result';
import axios from 'axios';

interface WordType {
  term: string;
  definition: string;
}

interface ModuleTypes {
  title: string;
  description: string;
  creator_name: string;
  words: WordType[];
  code: string;
}

function MemorizingMode() {
  const { code } = useParams();  
  const [moduleData, setModuleData] = useState<ModuleTypes | null>(null); 
  const [currentCardIndex, setCurrentCardIndex] = useState(0);  
  const [showResult, setShowResult] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [shuffledOptions, setShuffledOptions] = useState<WordType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      fetchModuleDataFromAPI(code); 
    }
  }, [code]);

  useEffect(() => {
    if (moduleData && moduleData.words.length > 0) {
      const current = moduleData.words[0];
      const wrongs = getRandomIncorrectOptions(current.term);
      setShuffledOptions(shuffleArray([current, ...wrongs]));
    }
  }, [moduleData]);
  

  const fetchModuleDataFromAPI = async (code: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/modules/code/${code}`);
      setModuleData(response.data);  
    } catch (error) {
      console.error("Error fetching module data", error);
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  if (!moduleData || !moduleData.words || moduleData.words.length === 0) {
    return <div>Loading...</div>;  
  }

  const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
  };


  const getRandomIncorrectOptions = (correctTerm: string) => {
    const wrongVariants = moduleData.words.filter(word => word.term !== correctTerm);
    const selectedWrongVariants = shuffleArray(wrongVariants).slice(0, 3);
    return selectedWrongVariants;
  };

  const nextCard = () => {
    const newIndex = currentCardIndex + 1;
    const nextWord = moduleData?.words[newIndex];
  
    if (nextWord) {
      const wrongs = getRandomIncorrectOptions(nextWord.term);
      setShuffledOptions(shuffleArray([nextWord, ...wrongs]));
    }
  
    setCurrentCardIndex(newIndex);  
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
    setCorrectAnswers(0);  
    setWrongAnswers(0); 
    setCurrentCardIndex(0); 
  };

  const currentCard = moduleData.words[currentCardIndex];


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
            onRestart={handleRestart} 
          />
        ) : ( 
          currentCardIndex + 1 === moduleData.words.length ? (
            <LearningCard 
              term={currentCard.term} 
              definition={currentCard.definition} 
              options={shuffledOptions} 
              next={() => setShowResult(true)} 
              updateAnswerCount={updateAnswerCount}
            />
          ) : (
            <LearningCard 
              term={currentCard.term} 
              definition={currentCard.definition} 
              options={shuffledOptions} 
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
