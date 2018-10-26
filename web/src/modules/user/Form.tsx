import * as React from "react";
import { Input } from "../../ui/Input";
import { RedButton } from "../../ui/RedButton";

interface State {
  email: string;
  password: string;
}

interface Props {
  onSubmit: (data: State) => void;
  buttonText: string;
}

const createInput = ({
  name,
  label,
  type,
  placeholder,
  value,
  onChange
}: any) => (
  <Input
    label={name || label}
    type={type || "text"}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

export class Form extends React.PureComponent<Props, State> {
  state = {
    email: "",
    password: ""
  };

  handleChange = (e: any) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    } as any);
  };

  render() {
    const { password, email } = this.state;
    const emailInput = createInput({
      name: "email",
      value: email,
      onChange: this.handleChange
    });
    const passwordInput = createInput({
      name: "password",
      type: "password",
      value: password,
      onChange: this.handleChange
    });
    const submitButton = (
      <RedButton onClick={() => this.props.onSubmit(this.state)}>
        {this.props.buttonText}
      </RedButton>
    );

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div>{[emailInput, passwordInput, submitButton]}</div>
      </div>
    );
  }
}
