import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useModuleStore from '../Stores/useModuleStore';
import { useAuthStore } from '../Stores/useAuthStore';
import './testmode.scss'

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

function TestMode() {
  const { code } = useParams();  
  const { modules } = useModuleStore();
  const [moduleData, setModuleData] = useState<ModuleTypes | null>(null); 
  const { accessToken, isLoading, logout } = useAuthStore();
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


    </div>
  );
}

export default TestMode;
