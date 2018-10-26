import * as React from "react";
import { Query } from "react-apollo";
import { Redirect } from "react-router-dom";

import { MeQuery } from "../../schemaTypes";
import SubscribeUser from "./SubscribeUser";
import { meQuery } from "../../graphql/queries/me";
import { ChangeCreditCard } from "./ChangeCreditCard";
import { CancelSubscription } from "./CancelSubscription";

const noData = (data: any) => {
  return !data ? <div>data is undefined</div> : false;
};

type DataRenderer = (data: any) => any;

const loggedIn = (data: any) => {
  return !data.me ? <Redirect to="/login" /> : false;
};

const subscribeOnFreeTrial = (data: any) => {
  return data.me.type === "free-trial" ? <SubscribeUser /> : null;
};

const defaultRender = (data: any) => {
  return (
    <div>
      <div>your current last 4 digits: {data.me.ccLast4}</div>
      <ChangeCreditCard />
      <CancelSubscription />
    </div>
  );
};

const renderFirst = (data: any, funs: DataRenderer[]) => {
  const found = funs.find(fun => fun(data));
  return found ? found(data) : null;
};

export class Account extends React.PureComponent {
  render() {
    return (
      <Query<MeQuery> query={meQuery}>
        {({ data, loading }) => {
          // TODO: refactor as higher order component
          if (loading) {
            return null;
          }

          return renderFirst(data, [
            noData,
            loggedIn,
            subscribeOnFreeTrial,
            defaultRender
          ]);
        }}
      </Query>
    );
  }
}
