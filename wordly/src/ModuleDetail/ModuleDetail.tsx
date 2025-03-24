import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useModuleStore from '../Stores/useModuleStore';
import { useAuthStore } from '../Stores/useAuthStore';
import './moduledetails.scss'


interface Card {
  term: string;
  definition: string;
}

interface Module {
  title: string;
  description: string;
  creator_name: string;
  cards: Card[];
  code: string;
}

function ModuleDetail() {
  const { code } = useParams();  
  const { modules } = useModuleStore();
  const [moduleData, setModuleData] = useState<Module | null>(null); 
  const { accessToken, isLoading, logout} = useAuthStore();
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
          <div className="cards">
            {moduleData.cards.map((card, index) => (
              <div key={index} className="card">
                <h4>{card.term}</h4>
                <p>{card.definition}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>

  
  );
}

export default ModuleDetail;
