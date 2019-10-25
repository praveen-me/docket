import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

const AuthHOC = MainComponent => {
  class WrappedComponent extends Component {
    render() {
      return !this.props.currentUser._id ? (
        <MainComponent {...this.props} />
      ) : (
        <Redirect to="/" />
      );
    }
  }
  function mapStateToProps({ currentUser }) {
    return { currentUser };
  }

  return withRouter(connect(mapStateToProps)(WrappedComponent));
};

export default AuthHOC;
