import React from "react";
import PropTypes from "prop-types";
import styles from "./QuizForm.module.css";
import {
  QuizTimer,
  QuizProgress,
  QuizQuestion,
  QuizNavigation,
  QuizStatusBar,
  QuizTerminalHeader,
} from "./index";

const QuizFormContent = ({
  questionNumber,
  timeLeft,
  timerActive,
  progressPercentage,
  totalQuestions,
  answeredCount,
  activeQuestion,
  selectedAnswer,
  isLastQuestion,
  canProceed,
  onAnswerSelect,
  onPrevious,
  onNext,
  onFinish,
}) => {
  return (
    <div className={styles.questionMain}>
      <QuizTerminalHeader questionNumber={questionNumber} />

      <QuizTimer timeLeft={timeLeft} timerActive={timerActive} />

      <QuizProgress
        progressPercentage={progressPercentage}
        questionNumber={questionNumber}
        totalQuestions={totalQuestions}
        answeredCount={answeredCount}
      />

      <QuizQuestion
        activeQuestion={activeQuestion}
        questionNumber={questionNumber}
        selectedAnswer={selectedAnswer}
        onAnswerSelect={onAnswerSelect}
      />

      <QuizNavigation
        questionNumber={questionNumber}
        isLastQuestion={isLastQuestion}
        canProceed={canProceed}
        onPrevious={onPrevious}
        onNext={onNext}
        onFinish={onFinish}
      />

      <QuizStatusBar
        selectedAnswer={selectedAnswer}
        activeQuestion={activeQuestion}
      />
    </div>
  );
};

QuizFormContent.propTypes = {
  questionNumber: PropTypes.number.isRequired,
  timeLeft: PropTypes.number.isRequired,
  timerActive: PropTypes.bool.isRequired,
  progressPercentage: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  answeredCount: PropTypes.number.isRequired,
  activeQuestion: PropTypes.object.isRequired,
  selectedAnswer: PropTypes.string,
  isLastQuestion: PropTypes.bool.isRequired,
  canProceed: PropTypes.bool.isRequired,
  onAnswerSelect: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
};

export default QuizFormContent;
