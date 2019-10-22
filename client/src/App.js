import React, { useEffect, useState } from "react";
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
import AuthRoute from "./AuthRoute";
import Loader from "./components/Loader";

const token = localStorage.getItem("authToken");

const App = () => {
  const [loading, setLoading] = useState(token ? true : false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const { data } = await client.query({
            query: getUser
          });

          dispatch(setInitialUser(data.me));
          setLoading(false);
        } catch (e) {
          throw new Error(e);
        }
      })();
    }
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Router>
      <>
        <Header />
        <Switch>
          <AuthRoute path="/" exact component={Dashboard} />
          <Route path="/login" component={LogIn} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </>
    </Router>
  );
};

export default App;
