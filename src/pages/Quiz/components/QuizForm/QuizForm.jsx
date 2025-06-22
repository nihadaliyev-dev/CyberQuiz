import React from "react";
import PropTypes from "prop-types";
import styles from "./QuizForm.module.css";
import { QuizFormContent, QuizResults } from "./index";
import { useQuizLogic } from "./useQuizLogic";
import { useQuizKeyboard } from "./useQuizKeyboard";

const QuizForm = ({
  quizStatus,
  questions,
  quizResults: externalQuizResults,
  onQuizFinish,
  onQuizProgress,
  onQuizReset,
}) => {
  const {
    questionNumber,
    activeQuestion,
    selectedAnswer,
    isLastQuestion,
    showResults,
    quizResults,
    timeLeft,
    timerActive,
    progressPercentage,
    answeredCount,
    totalQuestions,
    handleAnswerSelect,
    previousQuestion,
    nextQuestion,
    finishQuiz,
    closeResults,
    closeCompletedResults,
    canProceed,
    cycleAnswerUp,
    cycleAnswerDown,
  } = useQuizLogic({
    quizStatus,
    questions,
    onQuizFinish,
    onQuizProgress,
  });

  useQuizKeyboard({
    quizStatus,
    activeQuestion,
    showResults,
    closeResults,
    previousQuestion,
    nextQuestion,
    finishQuiz,
    canProceed,
    isLastQuestion,
    handleAnswerSelect,
    questionNumber,
    cycleAnswerUp,
    cycleAnswerDown,
  });

  const finalQuizResults =
    quizStatus === "completed" ? externalQuizResults : quizResults;

  if (!activeQuestion && quizStatus !== "completed") {
    return null;
  }

  if (quizStatus === "completed" && finalQuizResults) {
    return (
      <div className={styles.form_main}>
        <QuizResults
          results={finalQuizResults}
          onClose={() => {
            closeCompletedResults();
            if (onQuizReset) {
              onQuizReset();
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className={styles.form_main}>
      <div
        className={styles.form}
        style={{ display: !showResults ? "block" : "none" }}
      >
        <QuizFormContent
          questionNumber={questionNumber}
          timeLeft={timeLeft}
          timerActive={timerActive}
          progressPercentage={progressPercentage}
          totalQuestions={totalQuestions}
          answeredCount={answeredCount}
          activeQuestion={activeQuestion}
          selectedAnswer={selectedAnswer}
          isLastQuestion={isLastQuestion}
          canProceed={canProceed}
          onAnswerSelect={handleAnswerSelect}
          onPrevious={previousQuestion}
          onNext={nextQuestion}
          onFinish={finishQuiz}
        />
      </div>

      {showResults && finalQuizResults && (
        <QuizResults
          results={finalQuizResults}
          onClose={closeCompletedResults}
        />
      )}
    </div>
  );
};

QuizForm.propTypes = {
  quizStatus: PropTypes.oneOf(["passive", "active", "completed"]).isRequired,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      question: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
      answer: PropTypes.string.isRequired,
      category: PropTypes.string,
      difficulty: PropTypes.string,
    })
  ),
  quizResults: PropTypes.shape({
    correctCount: PropTypes.number,
    answeredQuestions: PropTypes.number,
    totalQuestions: PropTypes.number,
    score: PropTypes.number,
    timeUsed: PropTypes.number,
  }),
  onQuizFinish: PropTypes.func.isRequired,
  onQuizProgress: PropTypes.func,
  onQuizReset: PropTypes.func,
};

QuizForm.defaultProps = {
  questions: [],
  onQuizProgress: () => {},
  onQuizReset: () => {},
};

export default QuizForm;
