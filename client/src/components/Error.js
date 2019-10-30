import React, { Component } from "react";

const ErrorUI = () => {
  return <div>Error</div>;
};

class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    return this.state.hasError ? <ErrorUI /> : this.props.children;
  }
}

export default Error;
