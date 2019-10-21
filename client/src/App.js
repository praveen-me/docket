import React, { Component, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./scss/app.scss";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { useDispatch, connect } from "react-redux";
import { setInitialUser } from "./store/actions/auth.action";
import client from "./graphql/config";
import { getUser } from "./graphql/user-queries";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      client
        .query({
          query: getUser
        })
        .then(({ data }) => {
          dispatch(setInitialUser(data.me));
        })
        .catch(e => {
          throw new Error(e);
        });
    }
  }, [dispatch]);

  return (
    <Router>
      <>
        <Header />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/login" component={LogIn} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </>
    </Router>
  );
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps)(App);
