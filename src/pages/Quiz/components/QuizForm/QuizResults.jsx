import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import {
  formatTime,
  getScoreColor,
  getScoreMessage,
} from "../../../../utils/quizUtils";
import styles from "./QuizForm.module.css";

const QuizResults = ({ results, onClose }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  const scoreColor = useMemo(
    () => getScoreColor(animatedScore),
    [animatedScore]
  );
  const scoreMessage = useMemo(
    () => getScoreMessage(animatedScore),
    [animatedScore]
  );
  const formattedTime = useMemo(
    () => formatTime(results.timeUsed),
    [results.timeUsed]
  );
  const completionRate = useMemo(() => {
    return Math.round(
      (results.answeredQuestions / results.totalQuestions) * 100
    );
  }, [results.answeredQuestions, results.totalQuestions]);

  useEffect(() => {
    const targetScore = results.score;
    const duration = 2000;
    const steps = 60;
    const increment = targetScore / steps;
    let currentScore = 0;

    const timer = setInterval(() => {
      currentScore += increment;
      if (currentScore >= targetScore) {
        setAnimatedScore(targetScore);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(currentScore));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [results.score]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onClose]);

  return (
    <div className={styles.resultsModal}>
      <div className={styles.resultsContent}>
        <div className={styles.terminalHeader}>
          <span className={styles.prompt}>root@cyberquiz:~$</span>
          <span className={styles.command}>./quiz --results</span>
        </div>

        <div className={styles.scoreContainer}>
          <div className={styles.scoreCircle}>
            <div
              className={styles.scorePercentage}
              style={{ color: scoreColor }}
            >
              {animatedScore}%
            </div>
            <div className={styles.scoreLabel}>SCORE</div>
          </div>
        </div>

        <div className={styles.resultsSummary}>
          <div className={styles.resultRow}>
            <span className={styles.resultLabel}>Correct Answers:</span>
            <span className={styles.resultValue}>
              {results.correctCount}/{results.answeredQuestions}
            </span>
          </div>
          <div className={styles.resultRow}>
            <span className={styles.resultLabel}>Questions Answered:</span>
            <span className={styles.resultValue}>
              {results.answeredQuestions}/{results.totalQuestions}
            </span>
          </div>
          <div className={styles.resultRow}>
            <span className={styles.resultLabel}>Completion Rate:</span>
            <span className={styles.resultValue}>{completionRate}%</span>
          </div>
          <div className={styles.resultRow}>
            <span className={styles.resultLabel}>Time Used:</span>
            <span className={styles.resultValue}>{formattedTime}</span>
          </div>
        </div>

        <div className={styles.scoreMessage}>{scoreMessage}</div>

        <div className={styles.resultsActions}>
          <button onClick={onClose} className={styles.resultsButton}>
            <span className={styles.keyBinding}>[ESC]</span> Close
          </button>
        </div>
      </div>
    </div>
  );
};

QuizResults.propTypes = {
  results: PropTypes.shape({
    correctCount: PropTypes.number.isRequired,
    answeredQuestions: PropTypes.number.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    timeUsed: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default QuizResults;
