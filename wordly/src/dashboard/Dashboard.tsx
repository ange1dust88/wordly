import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faFolder, faHouse, faIdCard, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import './dashboard.scss'
import { useState } from "react";
import General from "../General/General";
import Library from "../Library/Library";
import Cards from "../Cards/Cards";

function Dashboard() {

  const [sidebarState, setSidebarState] = useState<Boolean>(true);
  const [activeBlock, setActiveBlock] = useState<number>(0); 


  const handleBlockClick = (index: number) => {
    setActiveBlock(index); 
  };

  return (
    <div className="dashboard">
      <div className="dashboard__header">
          <div className="dashboard__header-left">
            <div className="dashboard__header-left-cont">
                <FontAwesomeIcon icon={faBars} className="dashboard__header-left-burger" onClick={ () => setSidebarState(!sidebarState)}/>
            </div>
              <Link to ='/dashboard' className="dashboard__header-left-logo"> Wordly.</Link>
          </div>

          <div className="dashboard__header-mid">
              <input type="text" placeholder="Search" />
              <FontAwesomeIcon icon={faMagnifyingGlass} className="dashboard__header-mid-icon" />
          </div>

          <div className="dashboard__header-right">
          <FontAwesomeIcon icon={faPlus} className="dashboard__header-right-icon" />
          </div>
      </div>

      <div className="dashboard__main">
        <div className={`dashboard__sidebar  ${ sidebarState ? '' : 'dashboard__sidebar--small'}  `}>
          <div
            className={`dashboard__sidebar-block ${activeBlock === 0 ? 'dashboard__sidebar-block--active' : ''}`}
            onClick={() => handleBlockClick(0)}
          >
           
              <FontAwesomeIcon icon={faHouse}  className="dashboard__sidebar-block-icon"/>
              <p className={`dashboard__sidebar-block-name ${sidebarState ? '' : 'dashboard__sidebar-block-name--hidden' }`}>General</p>
          </div>
          <div
            className={`dashboard__sidebar-block ${activeBlock === 1 ? 'dashboard__sidebar-block--active' : ''}`}
            onClick={() => handleBlockClick(1)}
          >
              <FontAwesomeIcon icon={faFolder} size="2x" className="dashboard__sidebar-block-icon"/>
              <p className={`dashboard__sidebar-block-name ${sidebarState ? '' : 'dashboard__sidebar-block-name--hidden' }`}>Your library</p>
          </div>
          <hr className="dashboard__sidebar-border" />
          <div
            className={`dashboard__sidebar-block ${activeBlock === 2 ? 'dashboard__sidebar-block--active' : ''}`}
            onClick={() => handleBlockClick(2)}
          >
              <FontAwesomeIcon icon={faIdCard} className="dashboard__sidebar-block-icon"/>
              <p className={`dashboard__sidebar-block-name ${sidebarState ? '' : 'dashboard__sidebar-block-name--hidden' }`}>Cards</p>
          </div>
        </div>

        <div className="dashboard__main-content">
          {activeBlock === 0 && <General />}
          {activeBlock === 1 && <Library />}
          {activeBlock === 2 && <Cards />}
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
