import React from "react";
import { VxRAdio, TextSpan, RadioInput } from "./radioElements";
class Radio extends React.Component {
  render() {
    return (
      <VxRAdio>
        <RadioInput
          type="radio"
          defaultChecked={this.props.defaultChecked}
          value={this.props.value}
          disabled={this.props.disabled}
          name={this.props.name}
          onClick={this.props.onClick}
          onChange={this.props.onChange}
          ref={this.props.ref}
          checked={this.props.checked}
        />
        <TextSpan>{this.props.label}</TextSpan>
      </VxRAdio>
    );
  }
}
export default Radio;
