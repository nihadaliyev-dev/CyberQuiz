import { useState, useEffect, useCallback, useMemo } from "react";
import {
  calculateQuizResults,
  getAnswerLetterFromOptions,
} from "../../../../utils/quizUtils";

const QUIZ_DURATION = 15 * 60;
const TIMER_INTERVAL = 1000;

export const useQuizLogic = ({
  quizStatus,
  questions,
  onQuizFinish,
  onQuizProgress,
}) => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION);
  const [timerActive, setTimerActive] = useState(false);

  const progressPercentage = useMemo(() => {
    if (!questions?.length) return 0;
    return ((questionNumber + 1) / questions.length) * 100;
  }, [questionNumber, questions]);

  const answeredCount = useMemo(() => {
    return Object.keys(answers).length;
  }, [answers]);

  const totalQuestions = useMemo(() => {
    return questions?.length || 0;
  }, [questions]);

  useEffect(() => {
    if (quizStatus === "active" && questions?.length > 0) {
      setActiveQuestion(questions[0]);
      setQuestionNumber(0);
      setSelectedAnswer(null);
      setAnswers({});
      setIsLastQuestion(questions.length === 1);
      setShowResults(false);
      setQuizResults(null);
      setTimeLeft(QUIZ_DURATION);
      setTimerActive(true);
    }
  }, [quizStatus, questions]);

  useEffect(() => {
    if (
      questions?.length > 0 &&
      questionNumber >= 0 &&
      questionNumber < questions.length
    ) {
      setActiveQuestion(questions[questionNumber]);
      setSelectedAnswer(answers[questionNumber] || null);
      setIsLastQuestion(questionNumber === questions.length - 1);
    }
  }, [questionNumber, questions, answers]);

  useEffect(() => {
    if (
      quizStatus === "active" &&
      onQuizProgress &&
      activeQuestion &&
      selectedAnswer
    ) {
      const answerLetter = getAnswerLetterFromOptions(
        selectedAnswer,
        activeQuestion.options
      );
      onQuizProgress({
        questionNumber,
        totalQuestions,
        selectedAnswer,
        answerLetter,
        questionText: activeQuestion.question,
      });
    }
  }, [
    quizStatus,
    onQuizProgress,
    activeQuestion,
    selectedAnswer,
    questionNumber,
    totalQuestions,
  ]);

  useEffect(() => {
    if (!timerActive || timeLeft <= 0) {
      if (timeLeft === 0) {
        setTimerActive(false);
      }
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setTimerActive(false);
          const results = calculateQuizResults(
            answers,
            questions,
            QUIZ_DURATION - prevTime
          );
          setQuizResults(results);
          setShowResults(true);
          onQuizFinish(answers, results);
          return 0;
        }
        return prevTime - 1;
      });
    }, TIMER_INTERVAL);

    return () => clearInterval(interval);
  }, [timerActive, timeLeft, onQuizFinish, answers, questions]);

  useEffect(() => {
    if (quizStatus === "completed") {
      setTimerActive(false);
    }
  }, [quizStatus]);

  const handleAnswerSelect = useCallback(
    (answer) => {
      setSelectedAnswer(answer);
      setAnswers((prev) => ({
        ...prev,
        [questionNumber]: answer,
      }));
    },
    [questionNumber]
  );

  const previousQuestion = useCallback(() => {
    if (questionNumber > 0) {
      setQuestionNumber((q) => q - 1);
    }
  }, [questionNumber]);

  const nextQuestion = useCallback(() => {
    if (questionNumber < totalQuestions - 1) {
      setQuestionNumber((q) => q + 1);
    }
  }, [questionNumber, totalQuestions]);

  const finishQuiz = useCallback(() => {
    const results = calculateQuizResults(
      answers,
      questions,
      QUIZ_DURATION - timeLeft
    );
    setQuizResults(results);
    setShowResults(true);
    onQuizFinish(answers, results);
  }, [answers, questions, timeLeft, onQuizFinish]);

  const closeResults = useCallback(() => {
    setShowResults(false);
    setQuizResults(null);
  }, []);

  const closeCompletedResults = useCallback(() => {
    setQuizResults(null);
    setShowResults(false);
    setQuestionNumber(0);
    setActiveQuestion(null);
    setSelectedAnswer(null);
    setAnswers({});
    setIsLastQuestion(false);
    setTimeLeft(QUIZ_DURATION);
    setTimerActive(false);
  }, []);

  const canProceed = useCallback(() => {
    return selectedAnswer !== null;
  }, [selectedAnswer]);

  const cycleAnswerUp = useCallback(() => {
    if (!activeQuestion?.options) return;

    const currentIndex = activeQuestion.options.findIndex(
      (option) => option === selectedAnswer
    );
    const totalOptions = activeQuestion.options.length;

    if (currentIndex === -1) {
      handleAnswerSelect(activeQuestion.options[0]);
    } else {
      const newIndex = currentIndex === 0 ? totalOptions - 1 : currentIndex - 1;
      handleAnswerSelect(activeQuestion.options[newIndex]);
    }
  }, [activeQuestion, selectedAnswer, handleAnswerSelect]);

  const cycleAnswerDown = useCallback(() => {
    if (!activeQuestion?.options) return;

    const currentIndex = activeQuestion.options.findIndex(
      (option) => option === selectedAnswer
    );
    const totalOptions = activeQuestion.options.length;

    if (currentIndex === -1) {
      handleAnswerSelect(activeQuestion.options[0]);
    } else {
      const newIndex = currentIndex === totalOptions - 1 ? 0 : currentIndex + 1;
      handleAnswerSelect(activeQuestion.options[newIndex]);
    }
  }, [activeQuestion, selectedAnswer, handleAnswerSelect]);

  return {
    questionNumber,
    activeQuestion,
    selectedAnswer,
    answers,
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
  };
};
