import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./scss/app.scss";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { connect } from "react-redux";
import { setInitialUser } from "./store/actions/auth.action";

class App extends Component {
  componentWillMount() {
    this.props.dispatch(
      setInitialUser(userData => {
        if (userData) {
          this.props.dispatch({
            type: "LOGIN_SUCCESS",
            data: userData.user
          });
          if (this.props.currentUser) {
            // this.checkAuth(this.props.currentUser)
          }
        }
      })
    );
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Header />
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps)(App);
