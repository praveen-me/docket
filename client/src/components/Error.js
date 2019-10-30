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

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true
    });
    console.log(error, errorInfo, "here");
  }

  render() {
    return this.state.hasError ? <ErrorUI /> : this.props.children;
  }
}

export default Error;
