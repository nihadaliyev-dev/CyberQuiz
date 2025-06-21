import React, { useRef, useEffect } from "react";

const TerminalInput = ({
  value,
  onChange,
  onKeyDown,
  show,
  onClick,
  prompt = "user@cyberquiz:~$",
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (show && inputRef.current) inputRef.current.focus();
  }, [show]);

  if (!show) return null;

  return (
    <div style={{ display: "flex", alignItems: "center" }} onClick={onClick}>
      <span style={{ color: "#0f0" }}>{prompt}&nbsp;</span>
      <input
        ref={inputRef}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        style={{
          background: "transparent",
          border: "none",
          outline: "none",
          color: "#0f0",
          fontFamily: "Fira Mono, monospace",
          fontSize: "1rem",
          width: "300px",
        }}
        autoFocus
      />
    </div>
  );
};

export default TerminalInput;
