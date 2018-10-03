import * as React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { MeQuery } from "../../schemaTypes";

const meQuery = gql`
  query MeQuery {
    me {
      id
      email
    }
  }
`;

export class MeView extends React.PureComponent {
  render() {
    return (
      <Query<MeQuery> query={meQuery}>
        {({ data, loading }) => {
          if (loading) {
            return null;
          }

          if (!data) {
            return <div>data is undefined</div>;
          }

          if (!data.me) {
            return <div>received no user</div>;
          }

          return <div>{data.me.email}</div>;
        }}
      </Query>
    );
  }
}
