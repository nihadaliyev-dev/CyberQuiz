import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [matrixChars, setMatrixChars] = useState([]);

  const generateMatrixChar = useCallback(() => {
    const chars =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    return chars[Math.floor(Math.random() * chars.length)];
  }, []);

  const createMatrixRain = useCallback(() => {
    const newChars = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      char: generateMatrixChar(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.1,
    }));
    setMatrixChars(newChars);
  }, [generateMatrixChar]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);

    createMatrixRain();

    const interval = setInterval(createMatrixRain, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [createMatrixRain]);

  const handleStartQuiz = useCallback(() => {
    navigate("/quiz");
  }, [navigate]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleStartQuiz();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleStartQuiz]);

  const memoizedMatrixChars = useMemo(
    () =>
      matrixChars.map((char) => (
        <div
          key={char.id}
          className={styles.matrixChar}
          style={{
            left: `${char.x}%`,
            top: `${char.y}%`,
            animationDuration: `${char.speed}s`,
            opacity: char.opacity,
          }}
        >
          {char.char}
        </div>
      )),
    [matrixChars]
  );

  const handleButtonMouseEnter = useCallback((e) => {
    e.target.style.transform = "scale(1.05) translateY(-2px)";
  }, []);

  const handleButtonMouseLeave = useCallback((e) => {
    e.target.style.transform = "scale(1) translateY(0)";
  }, []);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.background}>
        <div className={styles.gridOverlay}></div>
        <div className={styles.cyberLines}></div>
        <div className={styles.particles}></div>

        {memoizedMatrixChars}
      </div>

      <div className={`${styles.content} ${isLoaded ? styles.loaded : ""}`}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.logoText}>Cyber</span>
            <span className={styles.logoAccent}>Quiz</span>
            <div className={styles.logoGlow}></div>
          </div>
        </header>

        <main className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>
              <span className={styles.titleLine}>Test Your</span>
              <span className={styles.titleAccent}>Cybersecurity</span>
              <span className={styles.titleLine}>Knowledge</span>
            </h1>

            <p className={styles.subtitle}>
              Challenge yourself with interactive questions covering network
              security, cryptography, ethical hacking, and more. Are you ready
              to hack the system?
            </p>

            <div className={styles.features}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>🎯</div>
                <span>Multiple Difficulty Levels</span>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>⚡</div>
                <span>Real-time Timer</span>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>🎮</div>
                <span>Keyboard Navigation</span>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>📊</div>
                <span>Detailed Analytics</span>
              </div>
            </div>

            <div className={styles.ctaSection}>
              <button
                className={styles.startButton}
                onClick={handleStartQuiz}
                onMouseEnter={handleButtonMouseEnter}
                onMouseLeave={handleButtonMouseLeave}
              >
                <span className={styles.buttonText}>Start Quiz</span>
                <span className={styles.buttonIcon}>→</span>
                <div className={styles.buttonGlow}></div>
                <div className={styles.buttonParticles}></div>
              </button>

              <p className={styles.buttonHint}>
                Press <kbd>Enter</kbd> or click to begin your cyber journey
              </p>
            </div>
          </div>
        </main>

        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p className={styles.footerText}>
              Built with React & Vite • Terminal-style interface • Responsive
              design
            </p>
            <div className={styles.footerLinks}>
              <span>Difficulty: Beginner to Advanced</span>
              <span>Questions: 15+ Categories</span>
              <span>Time: Real-time tracking</span>
            </div>
          </div>
        </footer>
      </div>

      <div className={styles.floatingElements}>
        <div className={styles.floatingIcon}>🔒</div>
        <div className={styles.floatingIcon}>🛡️</div>
        <div className={styles.floatingIcon}>💻</div>
      </div>
    </div>
  );
};

export default Home;
