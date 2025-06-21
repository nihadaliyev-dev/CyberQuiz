import React, { useEffect, useState } from "react";
import styles from "./QuizForm.module.css";

const QuizForm = ({ quizStatus, questions }) => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Set active question when questions are loaded and quiz is active
  useEffect(() => {
    if (quizStatus === "active" && questions && questions.length > 0) {
      setActiveQuestion(questions[0]);
      setQuestionNumber(0);
      setSelectedAnswer(null);
    }
  }, [quizStatus, questions]);

  // Update active question when questionNumber changes
  useEffect(() => {
    if (
      questions &&
      questions.length > 0 &&
      questionNumber >= 0 &&
      questionNumber < questions.length
    ) {
      setActiveQuestion(questions[questionNumber]);
      setSelectedAnswer(null);
    }
  }, [questionNumber, questions]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  // Helper function to convert index to letter
  const getOptionLetter = (index) => {
    switch (index + 1) {
      case 1:
        return "A";
      case 2:
        return "B";
      case 3:
        return "C";
      case 4:
        return "D";
      default:
        return String.fromCharCode(65 + index);
    }
  };

  const previousQuestion = () => {
    if (questionNumber > 0) {
      setQuestionNumber((q) => q - 1);
    }
  };

  const nextQuestion = () => {
    if (questionNumber < questions.length - 1) {
      setQuestionNumber((q) => q + 1);
    }
  };

  console.log("Question Number:", questionNumber);
  console.log("Active Question:", activeQuestion);
  console.log("Selected Answer:", selectedAnswer);

  return (
    <div className={styles.form_main}>
      <div
        className={styles.form}
        style={{ display: quizStatus === "active" ? "block" : "none" }}
      >
        {activeQuestion && (
          <div className={styles.questionMain}>
            <h3>Question {questionNumber + 1}.</h3>
            <p className={styles.questionHeader}>{activeQuestion.question}</p>
            {activeQuestion.options && (
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                {activeQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    className={`${styles.answers} ${
                      selectedAnswer === option ? styles.selected : ""
                    }`}
                    onClick={() => handleAnswerSelect(option)}
                  >
                    <p>{"[" + getOptionLetter(index) + "]"}</p>
                    <input
                      style={{ display: "none" }}
                      type="radio"
                      name={`question-${activeQuestion.id}`}
                      value={option}
                      id={`option-${index}`}
                      checked={selectedAnswer === option}
                      onChange={() => handleAnswerSelect(option)}
                    />
                    <label htmlFor={`option-${index}`}>{option}</label>
                  </div>
                ))}
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {questionNumber > 0 && (
                <button onClick={previousQuestion} className={styles.buttons}>
                  Previous
                </button>
              )}
              {questionNumber < questions.length - 1 && (
                <button onClick={nextQuestion} className={styles.buttons}>
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizForm;
