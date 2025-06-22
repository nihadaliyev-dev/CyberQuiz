import React from "react";
import PropTypes from "prop-types";
import styles from "./QuizForm.module.css";

const QuizTerminalHeader = ({ questionNumber, command = "quiz" }) => {
  return (
    <div className={styles.terminalHeader}>
      <span className={styles.prompt}>root@cyberquiz:~$</span>
      <span className={styles.command}>
        ./{command} --question {questionNumber + 1}
      </span>
    </div>
  );
};

QuizTerminalHeader.propTypes = {
  questionNumber: PropTypes.number.isRequired,
  command: PropTypes.string,
};

QuizTerminalHeader.defaultProps = {
  command: "quiz",
};

export default QuizTerminalHeader;
