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
import useUserStore from '@/store/userStore';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"



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
  const { user } = useUserStore();
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

  const buyPremium = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/stripe/create-checkout-session');
      const { url } = response.data;
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error('Failed to create Stripe session:', err);
      alert('Error while starting payment.');
    }
  }

  if (!moduleData) {
    return <Loader/>;
  }

  useEffect(() => {
    if(!user){
      navigate('/login');
    }
  })
  

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

            {user?.premium ? (
              <Link to ={`/module-detail/${code}/testMode`} className="moduledetails__modes-mode">
                <div className="moduledetails__modes-mode-cont">
                  <h2>Test <span>📄</span></h2>
                </div>
              </Link>
            ):(

              <AlertDialog>
                <AlertDialogTrigger className="moduledetails__modes-mode">
                    <div className="moduledetails__modes-mode-premium">
                      <h2> Premium only</h2>
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent className='w-full flex flex-col'>
              
                  <AlertDialogHeader>
                    <AlertDialogTitle className='text-3xl'>Ready to level up?</AlertDialogTitle>
                    <AlertDialogDescription >
                      <span className='text-lg'>Test Mode is now available for Premium users — just <b>$10 for lifetime access</b></span>  
                      <h3 className='text-lg'>You’ll get:</h3>
                      <p className='text-lg'>• Full access to Test Mode</p>
                      <p className='text-lg'>• All future premium updates — no extra cost</p>
                      <p className='text-lg text-black'>Support development and get early access today!</p>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Not now</AlertDialogCancel>
                    <AlertDialogAction onClick = {buyPremium}>Get Premium Access</AlertDialogAction>
                  </AlertDialogFooter>

                </AlertDialogContent>
              </AlertDialog>
            )}
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
