import styled from "styled-components";
import colors from "../../constants/colors";

export const VxRAdio = styled.div`
  color: ${colors.dark};
  margin-left: 1rem;
  display: flex;
  align-items: center;
`;

export const RadioInput = styled.input`
  width: 1rem;
  height: 1rem;
  accent-color: ${colors.primary2};

  &:hover {
    transform: scale(1.1);
  }
`;

export const TextSpan = styled.span`
  font-size: 1rem;
  color: ${colors.dark};
  margin-left: 1rem;
  font-weight: 400;
  /* margin-bottom: 5px; */
`;
