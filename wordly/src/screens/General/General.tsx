
import { useEffect, useState } from 'react';
import './general.scss';
import Module from '@/components/Module/Module';
import axios from 'axios';
import Author from '@/components/Author/Author';
import Question from '@/components/Question/Question';
import { questionsData } from './questionsData';

interface UserType {
  author: string;
  moduleCount: number;
}

function General() {

  const [modules, setModules] = useState<any>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [questions] = useState(questionsData); 
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/modules");
        setModules(response.data);  
      } catch (error) {
        console.error("Error fetching modules");  
      }
    };
  
    fetchModules();  
  }, []); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users");
      }
    };

    fetchUsers();
  }, []);
  
  return (
    <div className="general">
      <div className="general__latest">
        <h1 className="general__latest-title general-title">Latest modules</h1>

        <div className="general__latest-list">
            { modules.map( (module:any) => (
              <Module
                key={module.id}
                title={module.title}
                description={module.description}
                creatorName={module.author}
                code={module.code}
              />
            ))}
        </div>


      </div>

      <div className='general__authors'>
        <h1 className="general__authors-title general-title">Best authors</h1>
    
        <div className="general__authors-list">
            { users.map( (user:any) => (
              <Author 
                key = {user.id}
                author = {user.author}
                moduleCount = {user.moduleCount}
              />
            ))}
            
        </div>

      </div>

      <div className='general__questions'>
        <h1 className="general__questions-title general-title">Popular questions</h1>
    
        <div className="general__questions-list">
          {questions.map ( (question, index) => (
            <Question
                key = {index}
                title = {question.title}
                image = {question.image}
                content = {question.content}
              />

            ))}
        </div>

      </div>


    </div>
  );
}

export default General;
