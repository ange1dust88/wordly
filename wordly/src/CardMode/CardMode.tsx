import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useModuleStore from '../Stores/useModuleStore';
import { useAuthStore } from '../Stores/useAuthStore';
import Card from '@/components/ui/Card/Card';
import './cardmode.scss'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
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

function CardMode() {
  const { code } = useParams();  
  const { modules } = useModuleStore();
  const [moduleData, setModuleData] = useState<ModuleTypes | null>(null); 
  const { accessToken, isLoading, logout } = useAuthStore();
  const navigate = useNavigate();
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const [knownWords, setKnownWords] = useState<string[]>([]);
  const [unknownWords, setUnknownWords] = useState<string[]>([]);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

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

  if (!moduleData) {
    return <div>Loading...</div>;
  }


  const handleKnown = (term: string) => {
    setKnownWords((prevKnownWords) => [...prevKnownWords, term]);
    moveToNextCard();
  };

  const handleUnknown = (term: string) => {
    setUnknownWords((prevUnknownWords) => [...prevUnknownWords, term]);
    moveToNextCard();
  };

  const moveToNextCard = () => {
    if (api) {
      const nextIndex = (current + 1) % moduleData.cards.length;
      setCurrent(nextIndex);
    }
  };

  const isLastCard = moduleData.cards.length === knownWords.length + unknownWords.length; 

  const handleRestart = () => {
    setKnownWords([]); 
    setUnknownWords([]); 
    setCurrent(0); 
    setCount(api?.scrollSnapList().length || 0);
    if (api) {
      api.scrollTo(0);
    }
  };

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
      {isLastCard ? (
        <Result 
          known={knownWords.length} 
          unknown={unknownWords.length} 
          onRestart={handleRestart} 
        />
      ) : (
        <div className="cardmode">
          <div className="cardmode__container">
            <div className="cardmode__statistic">
              <p className="cardmode__statistic-block wrong">
                <span className='wrong-count'>{unknownWords.length}</span> Still learning
              </p>
              <p className="cardmode__statistic-block right">
                I already know it <span className='right-count'>{knownWords.length}</span>
              </p>
            </div>

            <Carousel setApi={setApi} className='cardmode__cards'>
              <CarouselContent className='cardmode__cards' >
                <div className="cardmode__cards-count">
                  {current + 1}/{count}
                </div>
                {moduleData.cards.map((card, index) => (
                  <CarouselItem key={index}>
                    <Card 
                      term={card.term}
                      definition={card.definition}
                      index={index}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <div className="cardmode__controls">
              <FontAwesomeIcon 
                icon={faXmark} 
                className='wrong wrong-button'
                onClick={() => handleUnknown(moduleData.cards[current].term)} 
              />
              <FontAwesomeIcon 
                icon={faCheck} 
                className='right right-button' 
                onClick={() => handleKnown(moduleData.cards[current].term)} 
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default CardMode;
