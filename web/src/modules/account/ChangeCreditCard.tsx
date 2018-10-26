import * as React from "react";
import StripeCheckout from "react-stripe-checkout";
import { Mutation, MutationFn } from "react-apollo";
import { gql } from "apollo-boost";
import {
  ChangeCreditCardMutation,
  ChangeCreditCardMutationVariables
} from "../../schemaTypes";
import { userFragment } from "../../graphql/fragments/userFragment";

type Mutate = MutationFn<
  ChangeCreditCardMutation,
  ChangeCreditCardMutationVariables
>;

export const createMutater = (mutate: Mutate) => {
  return async (token: any) => {
    const response = await mutate({
      variables: { source: token.id, ccLast4: token.card.last4 }
    });
    console.log(response);
  };
};

const changeCreditCardMutation = gql`
  mutation ChangeCreditCardMutation($source: String!, $ccLast4: String!) {
    changeCreditCard(source: $source, ccLast4: $ccLast4) {
      ...UserInfo
    }
  }

  ${userFragment}
`;

export class ChangeCreditCard extends React.PureComponent {
  render() {
    return (
      <Mutation<ChangeCreditCardMutation, ChangeCreditCardMutationVariables>
        mutation={changeCreditCardMutation}
      >
        {mutate => (
          <StripeCheckout
            token={createMutater(mutate)}
            panelLabel="Change Card"
            stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE!}
          >
            <button>Change credit card</button>
          </StripeCheckout>
        )}
      </Mutation>
    );
  }
}
