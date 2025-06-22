import React from "react";
import styles from "./QuizForm.module.css";

const QuizProgress = ({
  progressPercentage,
  questionNumber,
  totalQuestions,
  answeredCount,
}) => {
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <span className={styles.progressText}>
        Question {questionNumber + 1} of {totalQuestions} ({answeredCount}/
        {totalQuestions} answered)
      </span>
    </div>
  );
};

export default QuizProgress;
