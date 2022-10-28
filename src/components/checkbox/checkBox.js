import React from "react";
import { CheckInput, TextSpan, VxCheckbox } from "./checkboxElements";
class Checkbox extends React.Component {
  render() {
    return (
      <VxCheckbox
        className={`vx-checkbox-con ${
          this.props.className ? this.props.className : ""
        } vx-checkbox-${this.props.color}`}
      >
        <CheckInput
          type="checkbox"
          defaultChecked={this.props.defaultChecked}
          checked={this.props.checked}
          value={this.props.value}
          disabled={this.props.disabled}
          onClick={this.props.onClick ? this.props.onClick : null}
          onChange={this.props.onChange ? this.props.onChange : null}
        />
        <TextSpan>{this.props.label}</TextSpan>
      </VxCheckbox>
    );
  }
}

export default Checkbox;
