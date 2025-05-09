import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Card from '@/components/Card/Card';
import './cardmode.scss';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import Result from '@/components/Result/Result';
import axios from 'axios';
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

function CardMode() {
  const { code } = useParams();  
  const [moduleData, setModuleData] = useState<ModuleTypes | null>(null); 
  const navigate = useNavigate();
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const [knownWords, setKnownWords] = useState<string[]>([]);
  const [unknownWords, setUnknownWords] = useState<string[]>([]);
  const {user} = useUserStore();

  useEffect(() => {
    if(!user){
      navigate('/login');
    }
  })
  

  useEffect(() => {
    if (code) {
      fetchModuleDataFromAPI(code);  
    }
  }, [code]);

  const fetchModuleDataFromAPI = async (code: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/modules/code/${code}`);
      setModuleData(response.data);  
    } catch (error) {
      console.error("Error fetching module data", error);
    }
  };

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleLogout = () => {
    navigate('/login');
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
      const nextIndex = (current + 1) % moduleData.words.length;
      setCurrent(nextIndex);
      api.scrollTo(nextIndex);  
    }
  };

  const isLastCard = moduleData.words.length === knownWords.length + unknownWords.length;

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
                {moduleData.words.map((card, index) => (
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
                onClick={() => handleUnknown(moduleData.words[current].term)} 
              />
              <FontAwesomeIcon 
                icon={faCheck} 
                className='right right-button' 
                onClick={() => handleKnown(moduleData.words[current].term)} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardMode;
