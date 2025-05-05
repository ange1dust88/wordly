import { Link } from 'react-router-dom';
import './author.scss'

interface AuthorType{
    author: string;
    moduleCount: number;
}

function Author( {author, moduleCount}:AuthorType) {
  return (
    <Link to={`/profile/${author}`} className='author'>
        <img src="profile.webp" className='author__image'/>
        <h1 className="author__username">{author}</h1>
        <p className="author__modules">{moduleCount} modules</p>
    </Link>
  )
}

export default Author
