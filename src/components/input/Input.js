import { InputContainer, CustumInput, InputButton } from "./InputElements";
import { Search } from "react-feather";
import { Spinner } from "react-bootstrap";

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
      {props.isLoading ? (
        <InputButton>
          <Spinner
            as="span"
            animation="border"
            size="lg"
            role="status"
            aria-hidden="true"
          />
        </InputButton>
      ) : (
        <InputButton onClick={props.onButtonClick}>
          <Search size={20} />
        </InputButton>
      )}
    </InputContainer>
  );
};
