import * as React from "react";
import * as ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import registerServiceWorker from "./registerServiceWorker";
import { Routes } from "./Routes";
import { client } from "./client";
import { GlobalStyle } from "./style";

ReactDOM.render(
  <ApolloProvider client={client}>
    <GlobalStyle />
    <Routes />
  </ApolloProvider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
