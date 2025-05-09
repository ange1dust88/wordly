import Mainheader from '@/components/Mainheader/Mainheader';
import './authorpage.scss'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Module from '../../components/Module/Module'
import useUserStore from '@/store/userStore';


function AuthorPage() {
    const [userInfo, setUserInfo] = useState<any>();
    const navigate = useNavigate();
    const { author } = useParams<{ author: string }>();
    const {user} = useUserStore();
    const handleLogout = () => {
    navigate('/login');
    };

    useEffect(() => {
      if(!user){
        navigate('/login');
      }
    })

    useEffect(() => {
        const fetchUserModules = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/api/users/${author}/modules`);
            setUserInfo(response.data);
            console.log(response.data);
          } catch (error) {
            console.error("Error fetching users");
          }
        };
    
        fetchUserModules();
      }, []);

  return (
    <>
      <Mainheader logout={handleLogout}/>
  
      <div className="authorpage">
        <div className="wrapper">
          <div className="authorpage__container container">

            <div className="authorpage__top">
              <img src='/noimg.png' className='authorpage__top-img'/>
              <h1 className='authorpage__top-author'>{author}</h1>
            </div>
            <div className="authorpage__modules">
              {userInfo?.modules?.map((module: any, index: number) => (
                  <Module
                    title = {module.title}
                    description = {module.description}
    
                    code = {module.code}
                    key = {index}/>
                ))
              }
            </div>

          </div>
        </div>
      </div>
    </>

  );
}


export default AuthorPage
