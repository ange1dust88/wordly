import { useEffect } from 'react';
import useModuleStore from '../Stores/useModuleStore';
import './general.scss';
import { useAuthStore } from '../Stores/useAuthStore';
import Module from '../Components/Module/Module';

function General() {
  const { modules, setModules } = useModuleStore();
  const { accessToken } = useAuthStore();

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/modules/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error with data fetching');
        }

        const data = await response.json();
        console.log('Fetched modules:', data);

        setModules(data);

      } catch (error) {
        console.error('Error with data fetching:', error);
      }
    };

    fetchModules();
  }, [accessToken, setModules]);

  return (
    <div className="general">
      <div className="general__latest">
        <h1 className="general__latest-title general-title">Latest modules</h1>
        <div className="general__latest-list">
          {modules.map((module) => (
            <Module
              key={module.code}
              title={module.title}
              description={module.description}
              creatorName={module.creator_name}
              cards={module.cards}
              code={module.code}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default General;
