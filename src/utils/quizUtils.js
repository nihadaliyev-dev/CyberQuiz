export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};

export const getTimerColor = (timeLeft) => {
  if (timeLeft <= 300) return "#ff0000";
  if (timeLeft <= 600) return "#ff8800";
  return "#00ff00";
};

export const getScoreColor = (score) => {
  if (score >= 80) return "#00ff00";
  if (score >= 60) return "#ffff00";
  if (score >= 40) return "#ff8800";
  return "#ff0000";
};

export const getScoreMessage = (score) => {
  if (score >= 90) return "Excellent! You're a cybersecurity expert!";
  if (score >= 80) return "Great job! You have solid cybersecurity knowledge!";
  if (score >= 70) return "Good work! You're on the right track!";
  if (score >= 60) return "Not bad! Keep learning and improving!";
  if (score >= 50)
    return "You have some knowledge, but there's room for improvement!";
  return "Keep studying! Cybersecurity takes time to master!";
};

export const getOptionLetter = (index) => {
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

export const calculateQuizResults = (answers, questions, timeUsed) => {
  let correctCount = 0;
  const answeredQuestions = Object.keys(answers).length;
  const totalQuestions = questions?.length || 0;

  Object.keys(answers).forEach((questionIndex) => {
    const questionNum = parseInt(questionIndex);
    const userAnswer = answers[questionIndex];
    const correctAnswer = questions[questionNum]?.answer;

    if (userAnswer === correctAnswer) {
      correctCount++;
    }
  });

  const score =
    answeredQuestions > 0
      ? Math.round((correctCount / answeredQuestions) * 100)
      : 0;

  return {
    correctCount,
    answeredQuestions,
    totalQuestions,
    score,
    answers,
    timeUsed,
  };
};

export const validateQuizData = (questions) => {
  if (!Array.isArray(questions) || questions.length === 0) {
    return false;
  }

  return questions.every(
    (question) =>
      question &&
      typeof question.question === "string" &&
      Array.isArray(question.options) &&
      question.options.length > 0 &&
      typeof question.answer === "string" &&
      question.options.includes(question.answer)
  );
};

export const getAnswerLetterFromOptions = (selectedAnswer, options) => {
  if (!selectedAnswer || !options) return "?";

  const index = options.findIndex((option) => option === selectedAnswer);
  return index >= 0 ? getOptionLetter(index) : "?";
};
