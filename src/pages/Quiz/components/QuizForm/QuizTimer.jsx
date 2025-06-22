import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { formatTime, getTimerColor } from "../../../../utils/quizUtils";
import styles from "./QuizForm.module.css";

const QuizTimer = ({ timeLeft, timerActive }) => {
  const formattedTime = useMemo(() => formatTime(timeLeft), [timeLeft]);
  const timerColor = useMemo(() => getTimerColor(timeLeft), [timeLeft]);
  const showWarning = useMemo(() => timeLeft <= 300, [timeLeft]);

  return (
    <div className={styles.consoleTimer}>
      <div className={styles.timerHeader}>
        <span className={styles.prompt}>[TIMER]</span>
        <span className={styles.timerStatus}>
          {timerActive ? "RUNNING" : "STOPPED"}
        </span>
      </div>
      <div className={styles.timerDisplay}>
        <span className={styles.timerLabel}>TIME REMAINING:</span>
        <span className={styles.timerValue} style={{ color: timerColor }}>
          {formattedTime}
        </span>
      </div>
      {showWarning && (
        <div className={styles.timerWarning}>
          ⚠ WARNING: Less than 5 minutes remaining!
        </div>
      )}
    </div>
  );
};

QuizTimer.propTypes = {
  timeLeft: PropTypes.number.isRequired,
  timerActive: PropTypes.bool.isRequired,
};

export default QuizTimer;
