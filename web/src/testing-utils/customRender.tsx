import * as React from "react";
import { render } from "react-testing-library";
import { MockedProvider, MockedResponse } from "react-apollo/test-utils";
import { Router, Switch } from "react-router-dom";
import { createMemoryHistory } from "history";

export const customRender = (
  node: JSX.Element | null,
  mocks?: MockedResponse[],
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) => {
  return {
    history,
    ...render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router history={history}>
          <Switch>{node}</Switch>
        </Router>
      </MockedProvider>
    )
  };
};
