import React, { useState, useEffect } from "react";

const ReactApp = ({ message, onMessageChange, isVisible }) => {
  const [count, setCount] = useState(0);
  const [reactMessage, setReactMessage] = useState("Hello from React!");

  useEffect(() => {
    // Listen for messages from Vue parent
    const handleVueMessage = (event) => {
      if (event.detail && event.detail.type === "vue-to-react") {
        setReactMessage(event.detail.message);
      }
    };

    window.addEventListener("vue-to-react", handleVueMessage);
    return () => window.removeEventListener("vue-to-react", handleVueMessage);
  }, []);

  const handleButtonClick = () => {
    setCount(count + 1);
    // Send message back to Vue parent
    const event = new CustomEvent("react-to-vue", {
      detail: {
        type: "react-to-vue",
        message: `React button clicked ${count + 1} times!`,
        count: count + 1,
      },
    });
    window.dispatchEvent(event);
  };

  const handleMessageChange = (e) => {
    const newMessage = e.target.value;
    setReactMessage(newMessage);
    if (onMessageChange) {
      onMessageChange(newMessage);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #42b883",
        borderRadius: "8px",
        margin: "10px",
        backgroundColor: "#f0f8ff",
      }}
    >
      <h2 style={{ color: "#42b883", marginTop: 0 }}>React Component</h2>
      <p>
        <strong>Message from Vue:</strong> {message || "No message from Vue"}
      </p>
      <p>
        <strong>React State:</strong> {reactMessage}
      </p>
      <p>
        <strong>Counter:</strong> {count}
      </p>

      <div style={{ marginTop: "15px" }}>
        <input
          type="text"
          value={reactMessage}
          onChange={handleMessageChange}
          placeholder="Type a message..."
          style={{
            padding: "8px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "200px",
          }}
        />
        <button
          onClick={handleButtonClick}
          style={{
            padding: "8px 16px",
            backgroundColor: "#42b883",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Click Me ({count})
        </button>
      </div>
    </div>
  );
};

export default ReactApp;
