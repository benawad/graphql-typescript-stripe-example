import * as React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { MeQuery } from "../schemaTypes";
import { meQuery } from "../graphql/queries/me";
import { HeaderButton } from "src/ui/HeaderButton";

const sessionControls = () => {
  return (
    <div>
      <Link to="/login">
        <HeaderButton>login</HeaderButton>
      </Link>
      <Link to="/register">
        <HeaderButton>register</HeaderButton>
      </Link>
    </div>
  );
};

const notLoggedIn = (data: any) => {
  return !data.me ? sessionControls() : null;
};

const loggedIn = () => {
  return (
    <div>
      <Link to="/account">account</Link>
    </div>
  );
};

const headerStyle = {
  height: 50,
  width: "100%",
  backgroundColor: "rgb(255, 254, 252)",
  display: "flex",
  justifyContent: "space-around",
  padding: 10,
  alignItems: "center"
};

export class Header extends React.PureComponent {
  render() {
    return (
      <div style={{ ...headerStyle }}>
        <Link to="/">
          <HeaderButton style={{ fontSize: 24 }}>Stripe Example</HeaderButton>
        </Link>
        <Query<MeQuery> query={meQuery}>
          {({ data, loading }) => {
            if (loading || !data) {
              return null;
            }
            return notLoggedIn(data) || loggedIn();
          }}
        </Query>
      </div>
    );
  }
}
