import { Suspense, useState, useMemo } from "react";
import MessageComponent from "./components/MessageComponent.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { getMessageWithDelay, getMessageWithError } from "./utils/getMessage.js";
import "./App.css";

export default function App() {
  const [errorMode, setErrorMode] = useState(false);
  const [requestId, setRequestId] = useState(0);
  const promise = useMemo(() => {
    return errorMode ? getMessageWithError() : getMessageWithDelay();
  }, [errorMode, requestId]);

  const handleLoadData = () => {
    setErrorMode(false);
    setRequestId((id) => id + 1);
  };

  const handleTestError = () => {
    setErrorMode(true);
    setRequestId((id) => id + 1);
  };

  return (
    <div className="app-container">
      {}
      <header className="app-header">
        <h1>⚛️ React 19: use() Hook Demo</h1>
      </header>

      {}
      <div className="controls">
        <button 
          className="btn btn-primary" 
          onClick={handleLoadData}
        >
          ✅ Load Data (Success)
        </button>
        <button 
          className="btn btn-danger" 
          onClick={handleTestError}
        >
          ❌ Test Error
        </button>
      </div>

      {}
      <ErrorBoundary key={requestId}>
        <Suspense fallback={
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">⏳ Loading data...</p>
          </div>
        }>
          <MessageComponent messagePromise={promise} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
