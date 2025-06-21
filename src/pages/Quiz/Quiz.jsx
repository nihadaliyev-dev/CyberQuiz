import React, { useEffect, useState } from "react";
import styles from "./Quiz.module.css";
import { API_CONFIG, ENDPOINTS } from "../../constants";
import axios from "axios";

import QuizForm from "./components/QuizForm/QuizForm";
import Main from "./components/Main/Main";

const Quiz = () => {
  const [questions, setQuestions] = useState(null);
  const [quizStatus, setQuizStatus] = useState("passive");

  //   useEffect(() => {
  //     getAllQuestions();
  //   }, []);

  const startQuiz = () => {
    setQuizStatus("active");
    getAllQuestions();
  };

  const getAllQuestions = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.BASE_URL}${ENDPOINTS.QUIZ.GET_ALL}`
      );
      setQuestions(response.data);
      console.log(response.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <main className={styles.main}>
        <div className="" style={{ fontFamily: "Fira Code" }}>
          <Main quizStatus={quizStatus} startQuiz={startQuiz} />
          <QuizForm quizStatus={quizStatus} questions={questions} />
        </div>
      </main>
    </>
  );
};

export default Quiz;
