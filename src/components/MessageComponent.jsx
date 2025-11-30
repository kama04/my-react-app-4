import { use } from "react";
import "./MessageComponent.css";

export default function MessageComponent({ messagePromise }) {
  const message = use(messagePromise);

  return (
    <div className="message-container">
      <div className="message-card">
        <h2>📨 Received Message:</h2>
        <p className="message-text">{message}</p>
        <small className="message-timestamp">
          Loaded at {new Date().toLocaleTimeString("en-US")}
        </small>
      </div>
    </div>
  );
}
