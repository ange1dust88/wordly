import { Link } from 'react-router-dom'
import './mainheader.scss'
interface MainheaderType{
    logout: () => void;
}

function Mainheader({logout}:MainheaderType) {
  return (
   
    <div className="mainheader">
        <div className="mainheader__left">
          <Link to='/dashboard' className="mainheader__left-logo"> Wordly.</Link>
        </div>
        <div className="mainheader__right">
          <button className="mainheader__right-button" onClick={logout}>
            Log out
          </button>
        </div>
    </div>

  )
}

export default Mainheader
