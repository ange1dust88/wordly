import { useEffect, useState } from 'react';
import './cards.scss';
import CardTemplate from '@/components/CardTemplate/CardTemplate';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import useUserStore from "@/store/userStore"; 
import useModulesStore from "@/store/modulesStore"; 
import { useNavigate } from 'react-router-dom';

interface CardData {
  term: string;
  definition: string;
}

function Cards() {
  const user = useUserStore((state) => state.user);
  const [cards, setCards] = useState<CardData[]>([
    { term: '', definition: '' },
    { term: '', definition: '' },
  ]);
  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleDescription, setModuleDescription] = useState('');
  const { addModule: addModuleToStore } = useModulesStore();
  const navigate = useNavigate();
  const addCard = () => {
    setCards(prevCards => [
      ...prevCards,
      { term: '', definition: '' },
    ]);
  };


  
  useEffect(() => {
    if(!user){
      navigate('/login');
    }
  })
    

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

    const author = user?.username;
    if (!author) {
      console.error("Author is required!");
      return;
    }

    const moduleData = {
      title: moduleTitle,
      description: moduleDescription,
      author: user?.username,
      code: uuidv4(),
      words: cards.map(card => ({
        term: card.term,
        definition: card.definition,
      })),

    };

    try {
      await axios.post("http://localhost:8080/api/modules", moduleData);
      addModuleToStore(moduleData);
      setModuleTitle('');
      setModuleDescription('');
      setCards([{ term: '', definition: '' }, { term: '', definition: '' }]);
      alert('Module created successfully!');
    } catch (error) {
      console.error('Error during module creation:', error);
    }
  };


  return (
    <div className="cards">
      <div className="cards__header">
        <input
          type="text"
          className="cards__header-title cards__header-input"
          placeholder="Enter name of the module"
          value={moduleTitle}
          onChange={(e) => setModuleTitle(e.target.value)}
        />
        <input
          type="text"
          className="cards__header-description cards__header-input"
          placeholder="Enter a description..."
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
          Create Module
        </button>
      </div>
    </div>
  );
}

export default Cards;
