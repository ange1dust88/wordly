import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import './success.scss'
import { Link } from 'react-router-dom'
import useUserStore from '@/store/userStore';
import axios from 'axios';
import { useEffect } from 'react';

function Success() {
  const { user } = useUserStore();
  const setUser = useUserStore((state) => state.setUser);
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${user?.username}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching users");
    }
  };

  useEffect( () => {
    fetchUserInfo();
  }, []);

  return (
    <div className='success'>
      <div className="success__container">
        <FontAwesomeIcon icon={faCircleCheck} className="success__icon"/>
        <h1 className="success__title">Thank you!</h1>
        <h2 className="success__subtitle">Payment done Successfuly</h2>     
        <Link to = '/dashboard'>
          <button className="success__button">Home</button>
        </Link>
      </div>
    </div>
  )
}

export default Success
