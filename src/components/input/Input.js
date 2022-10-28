import { InputContainer, CustumInput, InputButton } from "./InputElements";
import { Search } from "react-feather";

export const Input = (props) => {
  return (
    <InputContainer>
      <CustumInput
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
      />
      <InputButton onClick={props.onButtonClick}>
        <Search size={20} />
      </InputButton>
    </InputContainer>
  );
};
