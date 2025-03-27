import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useModuleStore from '../Stores/useModuleStore';
import { useAuthStore } from '../Stores/useAuthStore';
import Card from '@/components/ui/Card/Card';
import './moduledetails.scss'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

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

function ModuleDetail() {
  const { code } = useParams();  
  const { modules } = useModuleStore();
  const [moduleData, setModuleData] = useState<ModuleTypes | null>(null); 
  const { accessToken, isLoading, logout } = useAuthStore();
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
              <h1 className='moduledetails__header-title'>{moduleData.title}</h1>
              <p className='moduledetails__header-description'>{moduleData.description}</p>
            </div>
            <p className='moduledetails__header-words'>{moduleData.cards.length} words</p>
          </div>

          <div className="moduledetails__modes">
            <Link to ={`/module-detail/${code}/cardMode`} className="moduledetails__modes-mode">
              <div className="moduledetails__modes-mode-cont">
                <h2> Cards <span>🖼️</span></h2>
                
              </div>
            </Link>
            <Link to ='' className="moduledetails__modes-mode">
              <div className="moduledetails__modes-mode-cont">
                <h2>Learning<span>🔊</span></h2>
              </div>
            </Link>
            <Link to ='' className="moduledetails__modes-mode">
            <div className="moduledetails__modes-mode-cont">
                <h2>Test <span>📄</span></h2>
              </div>
            </Link>
          </div>
      
          <Carousel setApi={setApi} className='moduledetails__cards'>
            <CarouselContent className='moduledetails__cards'>
              {moduleData.cards.map((card, index) => (
                <CarouselItem key={index}>
                  <Card 
                    term={card.term}
                    definition={card.definition}
                    index={index}
                  />
                </CarouselItem>
              ))} 
            </CarouselContent >
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
