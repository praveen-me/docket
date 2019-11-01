import React, { useEffect, useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./scss/app.scss";
import Header from "./components/Header";
const Dashboard = lazy(() => import("./components/Dashboard"));
const LogIn = lazy(() => import("./components/LogIn"));
const SignUp = lazy(() => import("./components/SignUp"));
import { useDispatch } from "react-redux";
import { setInitialUser } from "./store/actions/auth.action";
import client from "./graphql/config";
import { getUser } from "./graphql/user-queries";
import AuthRoute from "./AuthRoute";
import Loader from "./components/Loader";

const token = localStorage.getItem("authToken");

const App = () => {
  const [loading, setLoading] = useState(token ? true : false);
  const dispatch = useDispatch();

  window.addEventListener("offline", () => {
    throw new Error("Offline");
  });

  useEffect(() => {
    if (!navigator.onLine) {
      throw new Error("Offline");
    }

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
        <Suspense fallback={<Loader />}>
          <Switch>
            <AuthRoute path="/" exact component={Dashboard} />
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </Suspense>
      </>
    </Router>
  );
};

export default App;
