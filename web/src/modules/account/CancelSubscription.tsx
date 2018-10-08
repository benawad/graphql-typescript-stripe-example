import * as React from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

import { userFragment } from "../../graphql/fragments/userFragment";
import { CancelSubscriptionMutation } from "../../schemaTypes";

const cancelSubscriptionMutation = gql`
  mutation CancelSubscriptionMutation {
    cancelSubscription {
      ...UserInfo
    }
  }

  ${userFragment}
`;

export class CancelSubscription extends React.PureComponent {
  render() {
    return (
      <Mutation<CancelSubscriptionMutation>
        mutation={cancelSubscriptionMutation}
      >
        {mutate => (
          <button onClick={() => mutate()}>cancel subscription</button>
        )}
      </Mutation>
    );
  }
}
