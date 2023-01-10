import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // fallback overrides bolt-banner display completely
      if (this.props.fallback) {
        return this.props.fallback;
      } else {
        return (
          <bolt-banner status="error" align="center">
            Something went wrong.
          </bolt-banner>
        );
      }
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
