import React, { useState, useCallback, useMemo } from "react";
import { API_CONFIG, ENDPOINTS } from "../../constants";
import axios from "axios";
import styles from "./Quiz.module.css";

import QuizForm from "./components/QuizForm/QuizForm";
import Main from "./components/Main/Main";

const ERROR_MESSAGES = {
  LOAD_FAILED: "Failed to load questions. Please try again.",
  INVALID_RESPONSE: "Invalid response format from server.",
  NETWORK_ERROR: "Network error. Please check your connection.",
};

const Quiz = () => {
  const [questions, setQuestions] = useState(null);
  const [quizStatus, setQuizStatus] = useState("passive");
  const [quizProgress, setQuizProgress] = useState(null);
  const [quizResults, setQuizResults] = useState(null);
  const [error, setError] = useState(null);

  const startQuiz = useCallback(async () => {
    setQuizStatus("active");
    setQuizProgress(null);
    setQuizResults(null);
    setError(null);

    try {
      await getAllQuestions();
    } catch (err) {
      console.error("Failed to load questions:", err);
      setError(ERROR_MESSAGES.LOAD_FAILED);
      setQuizStatus("passive");
    }
  }, []);

  const getAllQuestions = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.BASE_URL}${ENDPOINTS.QUIZ.GET_ALL}`,
        {
          timeout: API_CONFIG.TIMEOUT,
        }
      );

      if (response?.data && Array.isArray(response.data)) {
        setQuestions(response.data);
        console.log("Questions loaded:", response.data.length);
      } else {
        throw new Error(ERROR_MESSAGES.INVALID_RESPONSE);
      }

      return response;
    } catch (error) {
      console.error("Error loading questions:", error);

      if (error.code === "ECONNABORTED") {
        throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
      }

      throw error;
    }
  }, []);

  const handleQuizFinish = useCallback((answers, results) => {
    console.log("Quiz finished with answers:", answers);
    console.log("Quiz results:", results);

    setQuizResults(results);
    setQuizStatus("completed");
  }, []);

  const handleQuizProgress = useCallback((progress) => {
    setQuizProgress(progress);
  }, []);

  const handleQuizReset = useCallback(() => {
    setQuizStatus("passive");
    setQuizResults(null);
    setQuizProgress(null);
    setQuestions(null);
  }, []);

  const mainProps = useMemo(
    () => ({
      quizStatus,
      startQuiz,
      quizProgress,
      quizResults,
    }),
    [quizStatus, startQuiz, quizProgress, quizResults]
  );

  const quizFormProps = useMemo(
    () => ({
      quizStatus,
      questions,
      quizResults,
      onQuizFinish: handleQuizFinish,
      onQuizProgress: handleQuizProgress,
      onQuizReset: handleQuizReset,
    }),
    [
      quizStatus,
      questions,
      quizResults,
      handleQuizFinish,
      handleQuizProgress,
      handleQuizReset,
    ]
  );

  const ErrorDisplay = useMemo(() => {
    if (!error) return null;

    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorMessage}>
          <span className={styles.errorIcon}>⚠</span>
          {error}
          <button onClick={startQuiz} className={styles.retryButton}>
            Retry
          </button>
        </div>
      </div>
    );
  }, [error, startQuiz]);

  return (
    <main className={styles.main}>
      <div style={{ fontFamily: "Fira Code" }}>
        <Main {...mainProps} />
        {ErrorDisplay}
        <QuizForm {...quizFormProps} />
      </div>
    </main>
  );
};

export default Quiz;
