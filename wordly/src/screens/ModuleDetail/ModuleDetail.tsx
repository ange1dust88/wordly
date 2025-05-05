import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Card from '@/components/Card/Card';
import './moduledetails.scss';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import axios from 'axios';
import Loader from '@/components/Loader/Loader';

interface WordType {
  term: string;
  definition: string;
  id: number;
}

interface ModuleTypes {
  title: string;
  description: string;
  creator_name: string;
  words: WordType[];
  id: number;
}

function ModuleDetail() {
  const { code } = useParams();  
  const [moduleData, setModuleData] = useState<ModuleTypes | null>(null); 
  const navigate = useNavigate();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const fetchModuleDataFromAPI = async (code: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/modules/code/${code}`);
      setModuleData(response.data);  
      console.log(response.data);

    } catch (error) {
      console.error("Error fetching module data", error);
    }
  };

  useEffect(() => {
    if (code) {
      fetchModuleDataFromAPI(code);  
    }
  }, [code]);

  const handleLogout = () => {
    navigate('/login');
  };

  if (!moduleData) {
    return <Loader/>;
  }

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

      <div className="moduledetails">
        <div className="moduledetails__container">
          <div className="moduledetails__header">
            <div className='moduledetails__header-block'>
              <h1 className='moduledetails__header-title'>{moduleData?.title}</h1>
              <p className='moduledetails__header-description'>{moduleData?.description}</p>
            </div>
            <p className='moduledetails__header-words'>{moduleData?.words ? moduleData.words.length : 0} words</p>
          </div>

          <div className="moduledetails__modes">
            <Link to ={`/module-detail/${code}/cardMode`} className="moduledetails__modes-mode">
              <div className="moduledetails__modes-mode-cont">
                <h2> Cards <span>🖼️</span></h2>
              </div>
            </Link>

            <Link to ={`/module-detail/${code}/memorizingMode`} className="moduledetails__modes-mode">
              <div className="moduledetails__modes-mode-cont">
                <h2>Memorizing<span>🔊</span></h2>
              </div>
            </Link>

            <Link to ={`/module-detail/${code}/testMode`} className="moduledetails__modes-mode">
              <div className="moduledetails__modes-mode-cont">
                <h2>Test <span>📄</span></h2>
              </div>
            </Link>
          </div>
      
          <Carousel setApi={setApi} className='moduledetails__cards'>
            <CarouselContent className='moduledetails__cards'>
              {moduleData.words.map((card) => (
                <CarouselItem className='moduledetails__cards-card' key = {card.id}>
                  <Card 
                    term={card.term}
                    definition={card.definition}
                    index={card.id}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className='moduledetails__cards-arrow moduledetails__cards-arrow--left' />
            <CarouselNext className='moduledetails__cards-arrow moduledetails__cards-arrow--right' />
          </Carousel>
          <div className="text-center text-2xl">
             {current}/{count}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModuleDetail;
