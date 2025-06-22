import { useEffect, useCallback } from "react";

export const useQuizKeyboard = ({
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
}) => {
  const handleKeyPress = useCallback(
    (event) => {
      if (quizStatus !== "active" || !activeQuestion) return;

      if (showResults) {
        if (event.key === "Escape") {
          event.preventDefault();
          closeResults();
        }
        return;
      }

      switch (event.key) {
        case "F7":
          event.preventDefault();
          previousQuestion();
          break;
        case "F8":
          event.preventDefault();
          if (canProceed() && !isLastQuestion) {
            nextQuestion();
          }
          break;
        case "F9":
          event.preventDefault();
          if (isLastQuestion && canProceed()) {
            finishQuiz();
          }
          break;
        case "1":
        case "2":
        case "3":
        case "4": {
          event.preventDefault();
          const optionIndex = parseInt(event.key) - 1;
          if (activeQuestion.options?.[optionIndex]) {
            handleAnswerSelect(activeQuestion.options[optionIndex]);
          }
          break;
        }
        case "a":
        case "A":
          event.preventDefault();
          if (activeQuestion.options?.[0]) {
            handleAnswerSelect(activeQuestion.options[0]);
          }
          break;
        case "b":
        case "B":
          event.preventDefault();
          if (activeQuestion.options?.[1]) {
            handleAnswerSelect(activeQuestion.options[1]);
          }
          break;
        case "c":
        case "C":
          event.preventDefault();
          if (activeQuestion.options?.[2]) {
            handleAnswerSelect(activeQuestion.options[2]);
          }
          break;
        case "d":
        case "D":
          event.preventDefault();
          if (activeQuestion.options?.[3]) {
            handleAnswerSelect(activeQuestion.options[3]);
          }
          break;
        case "ArrowUp":
          event.preventDefault();
          cycleAnswerUp();
          break;
        case "ArrowDown":
          event.preventDefault();
          cycleAnswerDown();
          break;
        case "ArrowLeft":
          event.preventDefault();
          if (questionNumber > 0) {
            previousQuestion();
          }
          break;
        case "ArrowRight":
        case " ":
          event.preventDefault();
          if (canProceed()) {
            if (!isLastQuestion) {
              nextQuestion();
            } else {
              finishQuiz();
            }
          }
          break;
        default:
          break;
      }
    },
    [
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
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);
};
