import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import TerminalDisplay from "./TerminalDisplay";
import TerminalInput from "./TerminalInput";
import styles from "./TerminalIntro.module.css";

const introLines = [
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
  "The quiz will last 20 minutes.",
  "You will face a series of questions covering various security topics.",
  "Type 'start' (case-insensitive) and press Enter to begin the quiz.",
  "Please write 'Start' to start the quiz.",
];

const TerminalIntro = ({ quizStatus = "passive", startQuiz }) => {
  const [lines, setLines] = useState([]);
  const [currentSentence, setCurrentSentence] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Typing effect
  useEffect(() => {
    if (currentSentence < introLines.length) {
      if (currentChar < introLines[currentSentence].length) {
        const timeout = setTimeout(() => {
          setLines((prev) => {
            const newLines = [...prev];
            if (!newLines[currentSentence]) newLines[currentSentence] = "";
            newLines[currentSentence] +=
              introLines[currentSentence][currentChar];
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
  }, [currentChar, currentSentence]);

  // Handle input
  const handleInputChange = useCallback(
    (e) => setInputValue(e.target.value),
    []
  );
  const handleInputKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        const commandLine = `user@cyberquiz:~$ ${inputValue}`;
        if (inputValue.trim().toLowerCase() === "start") {
          setLines([commandLine, "Quiz Started #1"]);
          setInputValue("");
          if (typeof startQuiz === "function") startQuiz();
        } else {
          setLines((prev) => [
            ...prev,
            commandLine,
            `Command not found: '${inputValue}'. Please type 'start' to begin the quiz.`,
          ]);
          setInputValue("");
        }
      }
    },
    [inputValue, startQuiz]
  );

  const handleClick = useCallback(() => setShowInput(true), []);

  return (
    <div
      className={styles.terminal}
      style={{
        filter: quizStatus === "active" ? "brightness(0.4)" : "",
      }}
      onClick={handleClick}
    >
      <TerminalDisplay lines={lines} />
      {!showInput && currentSentence < introLines.length && (
        <span style={{ color: "#0f0" }}>|</span>
      )}
      <TerminalInput
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        show={showInput}
        onClick={handleClick}
      />
    </div>
  );
};

TerminalIntro.propTypes = {
  quizStatus: PropTypes.string,
  startQuiz: PropTypes.func,
};

export default TerminalIntro;
