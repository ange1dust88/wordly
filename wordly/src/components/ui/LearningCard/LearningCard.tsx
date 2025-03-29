import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './learningcard.scss';
import { faCheck, faVolumeHigh, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

interface LearningCardTypes {
  term: string;
  definition: string;
  options: VariantTypes[];
  next: () => void;
  updateAnswerCount: (isCorrect: boolean) => void;
}

interface VariantTypes {
  term: string;
  definition: string;
}

function LearningCard({ term, definition, options, next, updateAnswerCount }: LearningCardTypes) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null); 
  const [isAnswered, setIsAnswered] = useState<boolean>(false); 

  const speakTerm = (term: string) => {
    const utterance = new SpeechSynthesisUtterance(term);
    speechSynthesis.speak(utterance);
  };

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();  
    speakTerm(definition); 
  };

  const handleOptionClick = (selectedTerm: string) => {
    if (isAnswered) return; 

    setSelectedOption(selectedTerm); 
    setIsAnswered(true); 
  };

  const handleNext = () => {
    const isCorrect = selectedOption === term; 
    updateAnswerCount(isCorrect);  
    setIsAnswered(false);
    setSelectedOption(null);
    next();  
  }

  return (
    <div className='learningcard'>
      <div className="learningcard__header">
        <h2 className="learningcard__header-text">Definition</h2>    
        <FontAwesomeIcon
          icon={faVolumeHigh}
          className='learningcard__header-icon'
          onClick={handleIconClick} 
        />
      </div>
      <h2 className="learningcard__word">{definition}</h2>

      <div className="learningcard__bottom">
        <h2 className="learningcard__bottom-title">Choose right definition</h2>
        <div className="learningcard__bottom-options">
          {options.map((option, index) => {
            const isSelected = selectedOption === option.term; 
            const isCorrect = option.term === term; 

            let optionClass = "learningcard__bottom-options-option";

            if (isSelected) {
              optionClass = optionClass.replace("learningcard__bottom-options-option", ""); 
              optionClass += isCorrect ? " learningcard__bottom-options-option--right" : " learningcard__bottom-options-option--wrong";
            } else if (isAnswered) {
              optionClass = optionClass.replace("learningcard__bottom-options-option", ""); 
              optionClass += " learningcard__bottom-options-option--disabled";
            }

            return (
              <div 
                key={index} 
                className={optionClass} 
                onClick={() => handleOptionClick(option.term)} 
              >
                <p>
                  {isCorrect && isSelected && <FontAwesomeIcon icon={faCheck} className="right learningcard__bottom-options-option-icon" />}
                  {!isCorrect && isSelected && <FontAwesomeIcon icon={faXmark} className="wrong learningcard__bottom-options-option-icon" />}
                  {index + 1}. {option.term}
                </p>
              </div>
            );
          })}
        </div>
        {isAnswered && (
          <div className='learningcard__bottom-nav'>
            <button className="learningcard__bottom-nav-button" onClick={handleNext}>Next question</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LearningCard;
