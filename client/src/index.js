import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
const App = lazy(() => import("./App"));
import { Provider } from "react-redux";
import store from "./store/store";
import client from "./graphql/config";
import Error from "./components/Error/Error";
import Loader from "./components/Loader";

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Error>
        <Suspense fallback={<Loader />}>
          <App />
        </Suspense>
      </Error>
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);

// For hot module reload
if (module.hot) {
  module.hot.accept();
}
