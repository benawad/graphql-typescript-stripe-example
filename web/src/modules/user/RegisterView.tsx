import * as React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { RouteComponentProps } from "react-router-dom";

import { RegisterMutationVariables, RegisterMutation } from "../../schemaTypes";
import { Form } from "./Form";

const registerMutation = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`;

const createForm = (history: any) => {
  return (mutate: any) => (
    <Form
      buttonText="register"
      onSubmit={async data => {
        const response = await mutate({
          variables: data
        });
        console.log(response);
        history.push("/login");
      }}
    />
  );
};

export class RegisterView extends React.PureComponent<RouteComponentProps<{}>> {
  render() {
    return (
      <Mutation<RegisterMutation, RegisterMutationVariables>
        mutation={registerMutation}
      >
        {createForm(this.props.history)}
      </Mutation>
    );
  }
}
