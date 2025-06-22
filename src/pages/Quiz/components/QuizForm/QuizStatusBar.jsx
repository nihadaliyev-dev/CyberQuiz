import React from "react";
import PropTypes from "prop-types";
import { getAnswerLetterFromOptions } from "../../../../utils/quizUtils";
import styles from "./QuizForm.module.css";

const QuizStatusBar = ({ selectedAnswer, activeQuestion }) => {
  const answerLetter =
    selectedAnswer && activeQuestion?.options
      ? getAnswerLetterFromOptions(selectedAnswer, activeQuestion.options)
      : null;

  return (
    <div className={styles.statusBar}>
      <span className={styles.statusText}>
        {selectedAnswer
          ? `✓ Answer selected: ${answerLetter}`
          : "⚠ Please select an answer"}
      </span>
      <div className={styles.keyboardHints}>
        <span>
          Use A-D or 1-4 to select answers • ↑↓ arrows to cycle answers • ←→
          arrows or F7/F8 to navigate • Space/Enter to proceed
        </span>
      </div>
    </div>
  );
};

QuizStatusBar.propTypes = {
  selectedAnswer: PropTypes.string,
  activeQuestion: PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default QuizStatusBar;
