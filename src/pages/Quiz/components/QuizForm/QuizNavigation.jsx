import React from "react";
import PropTypes from "prop-types";
import styles from "./QuizForm.module.css";

const QuizNavigation = ({
  questionNumber,
  isLastQuestion,
  canProceed,
  onPrevious,
  onNext,
  onFinish,
}) => {
  return (
    <div className={styles.navigation}>
      <div className={styles.navLeft}>
        {questionNumber > 0 && (
          <button onClick={onPrevious} className={styles.navButton}>
            <span className={styles.keyBinding}>[F7]</span> Previous
          </button>
        )}
      </div>

      <div className={styles.navRight}>
        {!isLastQuestion ? (
          <button
            onClick={onNext}
            className={`${styles.navButton} ${
              !canProceed ? styles.disabled : ""
            }`}
            disabled={!canProceed}
          >
            Next <span className={styles.keyBinding}>[F8]</span>
          </button>
        ) : (
          <button
            onClick={onFinish}
            className={`${styles.navButton} ${
              !canProceed ? styles.disabled : ""
            }`}
            disabled={!canProceed}
          >
            Finish <span className={styles.keyBinding}>[F9]</span>
          </button>
        )}
      </div>
    </div>
  );
};

QuizNavigation.propTypes = {
  questionNumber: PropTypes.number.isRequired,
  isLastQuestion: PropTypes.bool.isRequired,
  canProceed: PropTypes.bool.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
};

export default QuizNavigation;
