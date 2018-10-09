import * as React from "react";
import * as ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
// @ts-ignore
import { createGlobalStyle } from "styled-components";

import registerServiceWorker from "./registerServiceWorker";
import { Routes } from "./Routes";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  credentials: "include"
});

const GlobalStyle = createGlobalStyle`
  body {
    background-color: rgb(255, 254, 252);
  }
  *:focus {
    outline: 0;
  }
  a {
    color: #0d0d0d;
    text-decoration: none;
  }
`;

ReactDOM.render(
  <ApolloProvider client={client}>
    <GlobalStyle />
    <Routes />
  </ApolloProvider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
