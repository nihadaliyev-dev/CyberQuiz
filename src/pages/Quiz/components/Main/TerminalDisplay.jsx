import React from "react";

const TerminalDisplay = ({ lines }) => (
  <>
    {lines.map((line, idx) => (
      <div key={idx}>{line}</div>
    ))}
  </>
);

export default TerminalDisplay;
