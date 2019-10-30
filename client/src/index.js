import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import client from "./graphql/config";
import Error from "./components/Error/Error";

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Error>
        <App />
      </Error>
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);
