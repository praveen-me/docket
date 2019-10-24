import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const AuthHOC = mainComponent => {

  class WrappedComponent extends Component {
    render() {
      console.log(this.props.currentUser._id);
      return this.props.currentUser._id ? (
        <mainComponent />
      ) : (
        <Redirect to="/" />
      );
    }
  }
  function mapStateToProps({ currentUser }) {
    return { currentUser };
  }

  return connect(mapStateToProps)(WrappedComponent);
};

export default AuthHOC;
