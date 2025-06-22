import React, { useRef, useEffect, forwardRef } from "react";

const TerminalInput = forwardRef(
  (
    { value, onChange, onKeyDown, show, onClick, prompt = "user@cyberquiz:~$" },
    ref
  ) => {
    const inputRef = useRef(null);
    const finalRef = ref || inputRef;

    useEffect(() => {
      if (show && finalRef.current) finalRef.current.focus();
    }, [show, finalRef]);

    if (!show) return null;

    return (
      <div style={{ display: "flex", alignItems: "center" }} onClick={onClick}>
        <span style={{ color: "#0f0" }}>{prompt}&nbsp;</span>
        <input
          ref={finalRef}
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
  }
);

TerminalInput.displayName = "TerminalInput";

export default TerminalInput;
