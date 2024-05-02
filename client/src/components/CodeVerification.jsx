import React, { useState } from "react";

const CodeVerification = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(null);

  const handleChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && isNaN(value)) {
      setError(`Input at index ${index + 1} must be a number.`);
    } else {
      setError(null);
    }

    if (value && index < 5) {
      document.getElementById(`code-input-${index + 1}`).focus();
    }

    if (value === "" && index > 0) {
      document.getElementById(`code-input-${index - 1}`).focus();
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        const index = code.findIndex((value) => value === "");
        if (index === -1) {
          // If no empty inputs found, focus the last input
          document.getElementById(`code-input-${5}`).focus();
        } else if (index > 0) {
          // Focus the previous input
          document.getElementById(`code-input-${index - 1}`).focus();
        }
      }
    });
  };

  // Add event listener for the backspace key

  const handleSubmit = async () => {
    const data = code.join("");
    try {
      const response = await fetch("/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: data }),
      });
      const result = await response.json();
      if (result.error) {
        setError("Verification Error");
      } else {
        window.location.href = "/success";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {code.map((value, index) => (
        <input
          key={index}
          id={`code-input-${index}`}
          type="text"
          maxLength="1"
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          style={{ width: "30px", marginRight: "5px" }}
        />
      ))}
      <button onClick={handleSubmit}>Submit</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default CodeVerification;
