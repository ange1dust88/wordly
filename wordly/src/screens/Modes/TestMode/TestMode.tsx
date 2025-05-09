import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './testmode.scss';
import Result from '@/components/Result/Result';
import LearningCardTest from '@/components/LearningCardTest/LearningCardTest';
import axios from 'axios';
import Loader from '@/components/Loader/Loader';
import useUserStore from '@/store/userStore';

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

function TestMode() {
  const { code } = useParams();  
  const {user} = useUserStore();
  const [moduleData, setModuleData] = useState<ModuleTypes | null>(null); 
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set()); 
  const [showResult, setShowResult] = useState<boolean>(false);
  const [shuffledOptionsMap, setShuffledOptionsMap] = useState<Record<number, WordType[]>>({});
  
  useEffect(() => {
    if(!user){
      navigate('/login');
    }
  })
  
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };


  useEffect( () => {
    if(!user?.premium) {
      navigate('/dashboard');
    }
  }, [])
  useEffect(() => {
    if (code) {

      fetchModuleDataFromAPI(code);
    }
  }, [code]);

  const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
  };


  const fetchModuleDataFromAPI = async (code: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/modules/code/${code}`);
      const data = response.data;
  
      const shuffledMap: Record<number, WordType[]> = {};
  
      data.words.forEach((word: WordType, index: number) => {
        const wrongVariants = data.words.filter((w: WordType) => w.term !== word.term);
        const selectedWrong = shuffleArray(wrongVariants).slice(0, 3);
        const shuffledOptions = shuffleArray([word, ...selectedWrong]);
        shuffledMap[index] = shuffledOptions;
      });
  
      setModuleData(data);
      setShuffledOptionsMap(shuffledMap);
    } catch (error) {
      console.error("Error fetching module data", error);
    }
  };
  

  if (!moduleData || !moduleData.words || moduleData.words.length === 0) {
    return <Loader />;
  }


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
    setAnsweredQuestions(new Set());
  };

  const allQuestionsAnswered = answeredQuestions.size === moduleData.words.length;

  return (
    <div className="testmode">
        <div className="dashboard">
          <div className="dashboard__header testmode__header">
            <div className="dashboard__header-left">
              <Link to='/dashboard' className="dashboard__header-left-logo"> Wordly.</Link>
            </div>
            <div className="dashboard__header-right">
              <button className="dashboard__header-right-button" onClick={handleLogout}>
                Log out
              </button>
            </div>
        </div>

        {showResult ? (
        <Result
          known={correctAnswers}
          unknown={wrongAnswers}
          onRestart={handleRestart}
        />
      ) : (
        <div className='testmode__cards'>
          {moduleData.words.map((word, index) => {
            const options = shuffledOptionsMap[index];

            if (!options) return null;

            return (
              <LearningCardTest
                key={index}
                term={word.term}
                definition={word.definition}
                options={options}
                updateAnswerCount={updateAnswerCount}
                showAnswers={false}
                setAnsweredQuestions={setAnsweredQuestions}
                questionIndex={index}
              />
            );
          })}


          {allQuestionsAnswered && (
            <div className="result-btn-container">
              <button onClick={() => setShowResult(true)} className="show-result-btn">
                Show Results
              </button>
            </div>
          )}
        </div>
      )}

        
      </div>
    </div>
  );
}

export default TestMode;
