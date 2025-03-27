import { useState } from 'react';
import CardTemplate from '../Components/CardTemplate/CardTemplate';
import './cards.scss';
import { useAuthStore } from '../Stores/useAuthStore';

interface CardData {
  term: string;
  definition: string;
  
}

function Cards() {
  const [cards, setCards] = useState<CardData[]>([
    { term: '', definition: ''},
    { term: '', definition: '' },
  ]);
  const { accessToken, username } = useAuthStore();
  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleDescription, setModuleDescription] = useState('');

  const addCard = () => {
    setCards(prevCards => [
      ...prevCards,
      { term: '', definition: '' },
    ]);
  };

  const deleteCard = (index: number) => {
    setCards(prevCards => prevCards.filter((_, i) => i !== index));
  };

  const updateCard = (index: number, field: keyof CardData, value: string) => {
    setCards(prevCards => {
      const newCards = [...prevCards];
      newCards[index][field] = value;
      return newCards;
    });
  };

  const addModule = async () => {
    if (!moduleTitle || !moduleDescription) {
        console.error("Title and Description are required!");
        return;  
    }

    const token = accessToken;
    try {
        const response = await fetch('http://127.0.0.1:8000/create-module/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                title: moduleTitle,
                description: moduleDescription,
                creator_name: username,  
                cards: cards,
            }),
        });
        console.log(response);
        setModuleTitle('');
        setModuleDescription('');
        setCards([{ term: '', definition: ''},{ term: '', definition: ''}]); 
        alert('Module created successfully!');
        
    } catch (error) {
        console.error('Error during fetch:', error);
    }

  };

  return (
    <div className='cards'>
      <div className="cards__header">
        <input
          type="text"
          className="cards__header-title cards__header-input"
          placeholder='Enter name of the module'
          value={moduleTitle}
          onChange={(e) => setModuleTitle(e.target.value)}
        />
        <input
          type="text"
          className="cards__header-description cards__header-input"
          placeholder='Enter a description...'
          value={moduleDescription}
          onChange={(e) => setModuleDescription(e.target.value)}
        />
      </div>

      <div className="cards__content">
        {cards.map((card, index) => (
          <CardTemplate
            key={index}
            number={index + 1}
            term={card.term}
            definition={card.definition}

            onDelete={() => deleteCard(index)}
            onUpdate={(field, value) => updateCard(index, field, value)}
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
  );
}

export default Cards;
