import * as React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { RouteComponentProps } from "react-router-dom";

import { LoginMutationVariables, LoginMutation } from "../../schemaTypes";
import { meQuery } from "../../graphql/queries/me";
import { userFragment } from "../../graphql/fragments/userFragment";
import { Form } from "./Form";

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...UserInfo
    }
  }

  ${userFragment}
`;

const updater = () => {
  return (cache: any, { data }: any) => {
    if (!data || !data.login) {
      return;
    }

    cache.writeQuery({
      query: meQuery,
      data: { me: data.login }
    });
  };
};

const createForm = (history: any) => {
  return (mutate: any, { client }: any) => (
    <Form
      buttonText="login"
      onSubmit={async data => {
        // optional reset cache
        await client.resetStore();
        const response = await mutate({
          variables: data
        });
        console.log(response);
        history.push("/account");
      }}
    />
  );
};

export class LoginView extends React.PureComponent<RouteComponentProps<{}>> {
  render() {
    return (
      <Mutation<LoginMutation, LoginMutationVariables>
        update={updater()}
        mutation={loginMutation}
      >
        {createForm(this.props.history)}
      </Mutation>
    );
  }
}
