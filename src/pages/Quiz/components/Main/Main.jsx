import React from "react";
import TerminalIntro from "./TerminalIntro";

const Main = ({ quizStatus, startQuiz, quizProgress, quizResults }) => {
  return (
    <TerminalIntro
      quizStatus={quizStatus}
      startQuiz={startQuiz}
      quizProgress={quizProgress}
      quizResults={quizResults}
    />
  );
};

export default Main;
