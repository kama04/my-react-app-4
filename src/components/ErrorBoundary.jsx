import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: "red" }}>
          <h3>Error!</h3>
          <p>{this.state.error.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
