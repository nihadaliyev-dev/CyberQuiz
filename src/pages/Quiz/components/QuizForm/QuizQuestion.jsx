import React from "react";
import PropTypes from "prop-types";
import { getOptionLetter } from "../../../../utils/quizUtils";
import styles from "./QuizForm.module.css";

const QuizQuestion = ({
  activeQuestion,
  questionNumber,
  selectedAnswer,
  onAnswerSelect,
}) => {
  return (
    <>
      {/* Question */}
      <div className={styles.questionContainer}>
        <div className={styles.questionPrompt}>
          <span className={styles.prompt}>Question {questionNumber + 1}:</span>
        </div>
        <div className={styles.questionText}>{activeQuestion.question}</div>
      </div>

      {/* Options */}
      {activeQuestion.options && (
        <div className={styles.optionsContainer}>
          <div className={styles.optionsPrompt}>
            <span className={styles.prompt}>Select your answer:</span>
          </div>
          <div className={styles.optionsList}>
            {activeQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`${styles.option} ${
                  selectedAnswer === option ? styles.selected : ""
                }`}
                onClick={() => onAnswerSelect(option)}
              >
                <span className={styles.optionLetter}>
                  [{getOptionLetter(index)}]
                </span>
                <span className={styles.optionText}>{option}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

QuizQuestion.propTypes = {
  activeQuestion: PropTypes.shape({
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  questionNumber: PropTypes.number.isRequired,
  selectedAnswer: PropTypes.string,
  onAnswerSelect: PropTypes.func.isRequired,
};

export default QuizQuestion;
