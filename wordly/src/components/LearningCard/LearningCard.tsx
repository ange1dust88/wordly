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

function LearningCard({ term, definition, options, updateAnswerCount, next }: LearningCardTypes) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null); 
  const [isAnswered, setIsAnswered] = useState<boolean>(false); 
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false); 
  


  const speakTerm = (term: string) => {
    const utterance = new SpeechSynthesisUtterance(term);
    speechSynthesis.speak(utterance);
  };

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();  
    speakTerm(definition); 
  };

  const handleOptionClick = (selectedTerm: string) => {
    if (isAnswered || isConfirmed) return; 

    setSelectedOption(selectedTerm); 
  };

  const handleConfirm = () => {
    if (!selectedOption) return; 

    const isCorrect = selectedOption === term;
    updateAnswerCount(isCorrect);
    setIsConfirmed(true);
    setIsAnswered(true); 
  };

  const handleNext = () => {
    setIsAnswered(false);
    setIsConfirmed(false);
    setSelectedOption(null);
    if (next) {
      next(); 
    }
  };

  return (
    <div className="learningcard">
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

            let optionClass = "";

            if (isAnswered) {
              if (isSelected) {
                optionClass = isCorrect 
                  ? "learningcard__bottom-options-option--right" 
                  : "learningcard__bottom-options-option--wrong";
              } else {
                optionClass = isCorrect 
                  ? "learningcard__bottom-options-option--rightshow" 
                  : "learningcard__bottom-options-option--disabled";
              }
            } else {
              optionClass = "learningcard__bottom-options-option";
              if (isSelected) {
                optionClass += " learningcard__bottom-options-option--selected";
              }
            }



            return (
              <div 
                key={index} 
                className={optionClass} 
                onClick={() => handleOptionClick(option.term)} 
              >
                <p>
                  {isCorrect && isAnswered && <FontAwesomeIcon icon={faCheck} className="right learningcard__bottom-options-option-icon" />}
                  {!isCorrect && isAnswered && <FontAwesomeIcon icon={faXmark} className="wrong learningcard__bottom-options-option-icon" />}
                  {index + 1}. {option.term}
                </p>
              </div>
            );
          })}
        </div>


        {!isConfirmed && selectedOption && (
          <div className="learningcard__bottom-nav">
            <button
              className="learningcard__bottom-nav-button"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        )}

    
        {isAnswered && isConfirmed && (
          <div className="learningcard__bottom-nav">
            <button
              className="learningcard__bottom-nav-button"
              onClick={handleNext}
            >
              Next question
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LearningCard;
