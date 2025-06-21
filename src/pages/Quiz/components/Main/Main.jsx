import React from "react";
import TerminalIntro from "./TerminalIntro";

const Main = ({ quizStatus, startQuiz }) => {
  return <TerminalIntro quizStatus={quizStatus} startQuiz={startQuiz} />;
};

export default Main;
