import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import TerminalDisplay from "./TerminalDisplay";
import TerminalInput from "./TerminalInput";
import styles from "./TerminalIntro.module.css";

const INTRO_LINES = [
  "user@cyberquiz:~$ nmap -A 192.168.1.1",
  "Starting Nmap 7.80 ( https://nmap.org ) at " +
    new Date().toLocaleString("en-GB", { hour12: false }),
  "PORT     STATE SERVICE VERSION",
  "22/tcp   open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3",
  "80/tcp   open  http    Apache httpd 2.4.29 ((Ubuntu))",
  "user@cyberquiz:~$ sudo apt update",
  "Hit:1 http://archive.ubuntu.com/ubuntu bionic InRelease",
  "Reading package lists... Done",
  "user@cyberquiz:~$ echo 'Stay safe online!'",
  "Stay safe online!",
  "Welcome to CyberQuiz - The Interactive Cybersecurity Quiz Platform!",
  "You are about to test your cybersecurity knowledge.",
  "The quiz will last 15 minutes.",
  "You will face a series of questions covering various security topics.",
  "Type 'start' (case-insensitive) and press Enter to begin the quiz.",
  "Please write 'Start' to start the quiz.",
];

const LOADING_MESSAGES = [
  "Initializing CyberQuiz system...",
  "Loading question database...",
  "Preparing quiz interface...",
  "System ready! Starting quiz...",
];

const getScoreMessage = (score) => {
  if (score >= 90) return "Excellent! You're a cybersecurity expert!";
  if (score >= 80) return "Great job! You have solid cybersecurity knowledge!";
  if (score >= 70) return "Good work! You're on the right track!";
  if (score >= 60) return "Not bad! Keep learning and improving!";
  if (score >= 50)
    return "You have some knowledge, but there's room for improvement!";
  return "Keep studying! Cybersecurity takes time to master!";
};

const TerminalIntro = ({
  quizStatus = "passive",
  startQuiz,
  quizProgress,
  quizResults,
}) => {
  const [lines, setLines] = useState([]);
  const [currentSentence, setCurrentSentence] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef(null);
  const hasStartedQuiz = useRef(false);
  const lastProgressRef = useRef(null);
  const terminalContentRef = useRef(null);
  const navigate = useNavigate();

  const isTypingActive = useMemo(() => {
    return !isLoading && quizStatus === "passive";
  }, [isLoading, quizStatus]);

  const shouldShowCursor = useMemo(() => {
    return (
      (!showInput &&
        currentSentence < INTRO_LINES.length &&
        !isLoading &&
        quizStatus === "passive") ||
      isLoading ||
      quizStatus === "completed" ||
      (quizStatus === "passive" && !isLoading)
    );
  }, [showInput, currentSentence, isLoading, quizStatus]);

  const terminalStyle = useMemo(
    () => ({
      filter: quizStatus === "active" ? "brightness(0.4)" : "",
      pointerEvents: quizStatus === "active" ? "none" : "auto",
    }),
    [quizStatus]
  );

  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop =
        terminalContentRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    if (!isTypingActive) return;

    if (currentSentence < INTRO_LINES.length) {
      if (currentChar < INTRO_LINES[currentSentence].length) {
        const timeout = setTimeout(() => {
          setLines((prev) => {
            const newLines = [...prev];
            if (!newLines[currentSentence]) newLines[currentSentence] = "";
            newLines[currentSentence] +=
              INTRO_LINES[currentSentence][currentChar];
            return newLines;
          });
          setCurrentChar((c) => c + 1);
        }, 1);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrentSentence((s) => s + 1);
          setCurrentChar(0);
        }, 10);
        return () => clearTimeout(timeout);
      }
    } else {
      setShowInput(true);
    }
  }, [currentChar, currentSentence, isTypingActive]);

  useEffect(() => {
    if (isLoading && !hasStartedQuiz.current) {
      let currentMessage = 0;
      const interval = setInterval(() => {
        if (currentMessage < LOADING_MESSAGES.length) {
          setLines((prev) => [...prev, LOADING_MESSAGES[currentMessage]]);
          currentMessage++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            if (!hasStartedQuiz.current && typeof startQuiz === "function") {
              hasStartedQuiz.current = true;
              startQuiz();
            }
          }, 500);
        }
      }, 600);

      return () => clearInterval(interval);
    }
  }, [isLoading, startQuiz]);

  useEffect(() => {
    if (quizStatus === "active" && quizProgress) {
      const { questionNumber, totalQuestions, selectedAnswer, answerLetter } =
        quizProgress;

      // Create a unique key for this specific answer selection
      const progressKey = `${questionNumber}-${selectedAnswer}`;

      // Only log if this is a new answer selection (not a duplicate)
      if (
        lastProgressRef.current !== progressKey &&
        selectedAnswer &&
        answerLetter
      ) {
        setLines((prev) => [
          ...prev,
          `Question ${
            questionNumber + 1
          }/${totalQuestions}: Selected answer ${answerLetter}`,
        ]);

        lastProgressRef.current = progressKey;
      }
    }
  }, [quizStatus, quizProgress]);

  useEffect(() => {
    if (quizStatus === "completed" && quizResults) {
      const { correctCount, answeredQuestions, totalQuestions, score } =
        quizResults;

      const resultsLines = [
        "user@cyberquiz:~$ ./quiz --results",
        "=== QUIZ RESULTS ===",
        `Correct Answers: ${correctCount}/${answeredQuestions}`,
        `Questions Answered: ${answeredQuestions}/${totalQuestions}`,
        `Completion Rate: ${Math.round(
          (answeredQuestions / totalQuestions) * 100
        )}%`,
        `Final Score: ${score}%`,
        "",
        getScoreMessage(score),
        "",
        "Press 'q' to quit",
      ];

      setLines((prev) => [...prev, ...resultsLines]);
      setShowInput(true);
    }
  }, [quizStatus, quizResults]);

  useEffect(() => {
    if (quizStatus === "passive") {
      hasStartedQuiz.current = false;
      lastProgressRef.current = null;
    }
  }, [quizStatus]);

  useEffect(() => {
    if (quizStatus === "active" && inputRef.current) {
      inputRef.current.blur();
      setShowInput(false);
    }
  }, [quizStatus]);

  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleInputKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        const commandLine = `user@cyberquiz:~$ ${inputValue}`;
        if (inputValue.trim().toLowerCase() === "start") {
          setLines((prev) => [...prev, commandLine]);
          setInputValue("");
          setIsLoading(true);
          setShowInput(false);
        } else {
          setLines((prev) => [
            ...prev,
            commandLine,
            `Command not found: '${inputValue}'. Please type 'start' to begin the quiz.`,
          ]);
          setInputValue("");
        }
      } else if (e.key === "q") {
        setLines((prev) => [
          ...prev,
          `user@cyberquiz:~$ ${inputValue}`,
          "Quitting CyberQuiz...",
          "Navigating to home page...",
        ]);
        setInputValue("");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    },
    [inputValue, navigate]
  );

  const handleClick = useCallback(() => {
    if (quizStatus !== "active" && !isLoading) {
      setShowInput(true);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 10);
    }
  }, [quizStatus, isLoading]);

  return (
    <div
      className={styles.terminal}
      style={terminalStyle}
      onClick={handleClick}
    >
      <div className={styles.terminalContent} ref={terminalContentRef}>
        <TerminalDisplay lines={lines} />
        {shouldShowCursor && <span style={{ color: "#0f0" }}>|</span>}
      </div>
      <div className={styles.terminalInput}>
        <TerminalInput
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          show={showInput && quizStatus !== "active" && !isLoading}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

TerminalIntro.propTypes = {
  quizStatus: PropTypes.string,
  startQuiz: PropTypes.func,
  quizProgress: PropTypes.object,
  quizResults: PropTypes.object,
};

export default TerminalIntro;
