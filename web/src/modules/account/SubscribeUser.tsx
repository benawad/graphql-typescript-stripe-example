import * as React from "react";
import StripeCheckout from "react-stripe-checkout";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import {
  CreateSubscriptionMutation,
  CreateSubscriptionMutationVariables
} from "../../schemaTypes";
import { userFragment } from "../../graphql/fragments/userFragment";

const createSubscriptionMutation = gql`
  mutation CreateSubscriptionMutation($source: String!, $ccLast4: String!) {
    createSubcription(source: $source, ccLast4: $ccLast4) {
      ...UserInfo
    }
  }

  ${userFragment}
`;

export default class SubscribeUser extends React.PureComponent {
  render() {
    return (
      <Mutation<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>
        mutation={createSubscriptionMutation}
      >
        {mutate => (
          <StripeCheckout
            token={async token => {
              const response = await mutate({
                variables: { source: token.id, ccLast4: token.card.last4 }
              });
              console.log(response);
            }}
            stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE!}
            amount={1000}
          />
        )}
      </Mutation>
    );
  }
}
