import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LoginView } from "./modules/user/LoginView";
import { RegisterView } from "./modules/user/RegisterView";
import { Account } from "./modules/account/Account";
import { PaidUsers } from "./modules/account/PaidUsers";

export class Routes extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginView} />
          <Route path="/register" component={RegisterView} />
          <Route path="/account" component={Account} />
          <Route path="/paid-users" component={PaidUsers} />
        </Switch>
      </BrowserRouter>
    );
  }
}
