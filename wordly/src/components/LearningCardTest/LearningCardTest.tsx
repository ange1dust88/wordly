import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './learningcardtest.scss';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

interface LearningCardTypes {
  term: string;
  definition: string;
  options: VariantTypes[];
  updateAnswerCount: (isCorrect: boolean) => void;
  showAnswers?: boolean;
  questionIndex: number;
  setAnsweredQuestions: React.Dispatch<React.SetStateAction<Set<number>>>;
}

interface VariantTypes {
  term: string;
  definition: string;
}

function LearningCardTest({
  term,
  definition,
  options,
  updateAnswerCount,
  showAnswers = true,
  questionIndex,
  setAnsweredQuestions
}: LearningCardTypes) {
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
  
    setAnsweredQuestions(prev => {
      const newSet = new Set(prev);
      newSet.add(questionIndex);
      console.log(`Answered questions: ${newSet.size}`);
      return newSet;
    });
  };
  
  return (
    <div className="learningcard">
      <div className="learningcard__header">
        <h2 className="learningcard__header-text">Definition</h2>
        <FontAwesomeIcon
          icon={faVolumeHigh}
          className="learningcard__header-icon"
          onClick={handleIconClick}
        />
      </div>
      <h2 className="learningcard__word">{definition}</h2>

      <div className="learningcard__bottom">
        <h2 className="learningcard__bottom-title">Choose the correct definition</h2>
        <div className="learningcard__bottom-options">
          {options.map((option, index) => {
            const isSelected = selectedOption === option.term;
            const isCorrect = option.term === term;

            let optionClass = "learningcard__bottom-options-option";

            if (isSelected && showAnswers) {
              optionClass += isCorrect
                ? " learningcard__bottom-options-option--right"
                : " learningcard__bottom-options-option--wrong";
            } else if (isAnswered) {
              optionClass += " learningcard__bottom-options-option--disabled";
            }

            if (isSelected && !isConfirmed) {
              optionClass += " learningcard__bottom-options-option--selected"; 
            }

            return (
              <div
                key={index}
                className={optionClass}
                onClick={() => handleOptionClick(option.term)}
              >
                <p>{index + 1}. {option.term}</p>
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
              {showAnswers ? "Next question" : "Confirm"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default LearningCardTest;
