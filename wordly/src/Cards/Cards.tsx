import { useState } from 'react';
import CardTemplate from '../Components/CardTemplate'
import './cards.scss'
import { useAuthStore } from '../Stores/useAuthStore';

function Cards() {
  const [cards, setCards] = useState<number[]>([1, 2]);
  const { accessToken } = useAuthStore.getState();

  const addCard = () => {
    setCards(prevCards => {
      const newCards = [...prevCards, prevCards.length + 1];
      return newCards;
    });
  };

  const deleteCard = (number: number) => {
    setCards(prevCards => {
      const newCards = prevCards.filter(card => card !== number);
      return newCards;
    });
  };

  const moveCardUp = (number: number) => {
    
  };

  const moveCardDown = (number: number) => {
    
  };

  const addModule = async () => {
    const token = accessToken; 
    const response = await fetch('http://127.0.0.1:8000/api/modules/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: "Module Title",
        description: "Module description",
        creator_name: "User's Name",
        words: [
          {
            term: 'Word 1',
            definition: 'Definition 1',
            image: 'example.png'
          },
        ],
      }),
    });
  
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.error('Failed to create module:', response.statusText);
    }
  };
  
  

  return (
    <div className='cards'>
        <div className="cards__header">
            <input type="text" className="cards__header-title cards__header-input" placeholder='Enter name of the module' />
            <input type="text" className="cards__header-description cards__header-input" placeholder='Enter a description...' />
        </div>
        
        <div className="cards__content">
            {cards.map((number, index) => (
              <CardTemplate 
                key={number} 
                number={index + 1}
                onDelete={deleteCard} 
                onMoveUp={moveCardUp} 
                onMoveDown={moveCardDown} 
                isMoveUpDisabled={index === 0} 
                isMoveDownDisabled={index === cards.length - 1} 
                isDeleteDisabled = {index <= 1}
              />
            ))}

            <div className="cards__content-add" onClick={addCard}>
                <h2 className="cards__content-add-number">{cards.length + 1}</h2>
                <h2 className="cards__content-add-text">Add card</h2>
                <h2 className="cards__content-add-right">{cards.length + 1}</h2>
            </div>
        </div>

        <div className="cards__bottom">
          <button
            className="cards__bottom-button"
            onClick={addModule}>
              Create
          </button>
        </div>
    </div>
  )
}

export default Cards
