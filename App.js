import React, { useState } from "react";

const caesarEncrypt = (text, shift) => {
  return text
    .split("")
    .map((char) => {
      if (char.match(/[A-Z]/)) {
        return String.fromCharCode(
          ((char.charCodeAt(0) - 65 + shift) % 26) + 65
        );
      } else if (char.match(/[a-z]/)) {
        return String.fromCharCode(
          ((char.charCodeAt(0) - 97 + shift) % 26) + 97
        );
      } else {
        return char;
      }
    })
    .join("");
};

const caesarDecrypt = (text, shift) => caesarEncrypt(text, (26 - (shift % 26)));

export default function CaesarCipherApp() {
  const [message, setMessage] = useState("");
  const [shift, setShift] = useState(3);
  const [operation, setOperation] = useState("encrypt");
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let result = "";
    if (operation === "encrypt") {
      result = caesarEncrypt(message, parseInt(shift));
    } else {
      result = caesarDecrypt(message, parseInt(shift));
    }
    setOutput(result);
    setHistory([
      ...history,
      {
        operation,
        input: message,
        shift: shift,
        output: result,
      },
    ]);
  };

  return (
    <div style={styles.appContainer}>
      <h1 style={styles.title}>Cybersecurity Caesar Cipher</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Message:
          <textarea
            style={styles.textarea}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here"
            required
          />
        </label>

        <label style={styles.label}>
          Shift Value:
          <input
            style={styles.input}
            type="number"
            min="1"
            max="25"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            required
          />
        </label>

        <label style={styles.label}>
          Operation:
          <select
            style={styles.select}
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
          >
            <option value="encrypt">Encrypt</option>
            <option value="decrypt">Decrypt</option>
          </select>
        </label>

        <button type="submit" style={styles.button}>
          {operation === "encrypt" ? "Encrypt" : "Decrypt"}
        </button>
      </form>

      <div style={styles.outputSection}>
        <h2 style={styles.subtitle}>Output:</h2>
        <p style={styles.output}>{output || "Your result will appear here"}</p>
      </div>

      <div style={styles.historySection}>
        <h2 style={styles.subtitle}>History</h2>
        {history.length === 0 ? (
          <p style={styles.noHistory}>No history yet.</p>
        ) : (
          <ul style={styles.historyList}>
            {history.map((item, index) => (
              <li key={index} style={styles.historyItem}>
                <strong>{item.operation === "encrypt" ? "Encrypted" : "Decrypted"}:</strong>{" "}
                "{item.input}" → "{item.output}" (Shift: {item.shift})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#0f111a",
    color: "#c8dadf",
    padding: "2rem",
    maxWidth: "600px",
    margin: "2rem auto",
    borderRadius: "12px",
    boxShadow: "0 0 15px #00ff99",
  },
  title: {
    textAlign: "center",
    textShadow: "0 0 8px #00ff99",
    marginBottom: "1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
  textarea: {
    marginTop: "0.5rem",
    padding: "0.5rem",
    borderRadius: "6px",
    border: "none",
    fontSize: "1rem",
    fontFamily: "inherit",
    backgroundColor: "#1a1d29",
    color: "#c8dadf",
    resize: "vertical",
    minHeight: "60px",
  },
  input: {
    marginTop: "0.5rem",
    padding: "0.5rem",
    borderRadius: "6px",
    border: "none",
    fontSize: "1rem",
    fontFamily: "inherit",
    backgroundColor: "#1a1d29",
    color: "#c8dadf",
  },
  select: {
    marginTop: "0.5rem",
    padding: "0.5rem",
    borderRadius: "6px",
    border: "none",
    fontSize: "1rem",
    fontFamily: "inherit",
    backgroundColor: "#1a1d29",
    color: "#c8dadf",
  },
  button: {
    marginTop: "1rem",
    padding: "0.75rem",
    backgroundColor: "#00ff99",
    color: "#0f111a",
    fontWeight: "bold",
    fontSize: "1.1rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 0 10px #00ff99",
  },
  outputSection: {
    marginTop: "2rem",
    padding: "1rem",
    backgroundColor: "#121524",
    borderRadius: "10px",
    boxShadow: "inset 0 0 8px #00ff99",
  },
  subtitle: {
    marginBottom: "0.5rem",
    borderBottom: "1px solid #00ff99",
    paddingBottom: "0.25rem",
  },
  output: {
    fontSize: "1.2rem",
    fontFamily: "'Courier New', Courier, monospace",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    color: "#00ff99",
  },
  historySection: {
    marginTop: "2rem",
    padding: "1rem",
    backgroundColor: "#121524",
    borderRadius: "10px",
    boxShadow: "inset 0 0 8px #00ff99",
  },
  noHistory: {
    fontStyle: "italic",
    color: "#666",
  },
  historyList: {
    listStyleType: "none",
    paddingLeft: 0,
  },
  historyItem: {
    marginBottom: "0.5rem",
  },
};


