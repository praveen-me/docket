import React, { Component } from "react";
import { Link } from "react-router-dom";

const ErrorUI = () => {
  return (
    <div className="err-page">
      <img src={require("./../../images/oops.png")} />
      <a href="/">Go to Home Page</a>
    </div>
  );
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
