import CardTemplate from '../Components/CardTemplate'
import './cards.scss'
function Cards() {
  return (
    <div className='cards'>
        <div className="cards__header">
            <input type="text" className="cards__header-title cards__header-input" placeholder='Enter name of the module' />
            <input type="text" className="cards__header-description cards__header-input" placeholder='Enter a description...' />
        </div>
        
        <div className="cards__content">
            <CardTemplate />
        </div>
    </div>
  )
}

export default Cards