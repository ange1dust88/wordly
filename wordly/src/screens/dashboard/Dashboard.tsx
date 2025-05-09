import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import General from "../General/General";
import Library from "../Library/Library";
import Cards from "../Cards/Cards";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faFolder, faHouse, faIdCard, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './dashboard.scss';
import axios from "axios";
import useUserStore from "@/store/userStore";

function Dashboard() {
  const {user} = useUserStore();
  const [sidebarState, setSidebarState] = useState<Boolean>(true);
  const [activeBlock, setActiveBlock] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);
  const [foundModules, setFoundModules] = useState([]);

  const handleBlockClick = (index: number) => {
    setActiveBlock(index); 
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  useEffect(() => {
    if(!user){
      navigate('/login');
    }
  })
  
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim()) {
        searchModule();
      } else {
        setFoundModules([]); 
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const searchModule = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/modules/search", {
        params: { title: search }
      });
      setFoundModules(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching modules", error);
    }
  };



  return (


    <div className="dashboard">
      <div className="dashboard__header">
        <div className="dashboard__header-left">
          <div className="dashboard__header-left-cont">
            <FontAwesomeIcon icon={faBars} className="dashboard__header-left-burger" onClick={() => setSidebarState(!sidebarState)} />
          </div>
          <Link to='/dashboard' className="dashboard__header-left-logo"> Wordly.</Link>
        </div>

        <div className="dashboard__header-mid">
          <input 
            type="text" 
            placeholder="Search" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} className="dashboard__header-mid-icon" />

          {foundModules.length > 0  && (
            <div className="dashboard__header-mid--dropdown">
                {foundModules.map( (module:any) => (
                  <Link 
                  to={`/module-detail/${module?.code}`}> 
                    <p className="dashboard__header-mid--dropdown-item">{module?.title}</p>
                  </Link>
                ))}
            </div>
          )}
        </div>

        <div className="dashboard__header-right">
          <button className="dashboard__header-right-button" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>

      <div className="dashboard__main">
        <div className={`dashboard__sidebar ${sidebarState ? '' : 'dashboard__sidebar--small'}`}>
          <div
            className={`dashboard__sidebar-block ${activeBlock === 0 ? 'dashboard__sidebar-block--active' : ''}`}
            onClick={() => handleBlockClick(0)}
          >
            <FontAwesomeIcon icon={faHouse} className="dashboard__sidebar-block-icon" />
            <p className={`dashboard__sidebar-block-name ${sidebarState ? '' : 'dashboard__sidebar-block-name--hidden'}`}>General</p>
          </div>
          <div
            className={`dashboard__sidebar-block ${activeBlock === 1 ? 'dashboard__sidebar-block--active' : ''}`}
            onClick={() => handleBlockClick(1)}
          >
            <FontAwesomeIcon icon={faFolder} size="2x" className="dashboard__sidebar-block-icon" />
            <p className={`dashboard__sidebar-block-name ${sidebarState ? '' : 'dashboard__sidebar-block-name--hidden'}`}>Your library</p>
          </div>
          <hr className="dashboard__sidebar-border" />
          <div
            className={`dashboard__sidebar-block ${activeBlock === 2 ? 'dashboard__sidebar-block--active' : ''}`}
            onClick={() => handleBlockClick(2)}
          >
            <FontAwesomeIcon icon={faIdCard} className="dashboard__sidebar-block-icon" />
            <p className={`dashboard__sidebar-block-name ${sidebarState ? '' : 'dashboard__sidebar-block-name--hidden'}`}>Cards</p>
          </div>
        </div>

        <div className="dashboard__main-content">
          {activeBlock === 0 && <General />}
          {activeBlock === 1 && <Library />}
          {activeBlock === 2 && <Cards />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;