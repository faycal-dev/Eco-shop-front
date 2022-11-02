import styled from "styled-components";
import colors from "../../constants/colors";

export const PaginationConatainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const NextPrevButtons = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.greyFade};
  color: ${colors.greyDark};
  cursor: pointer;


  &:hover {
    transition: 0.3s all ease-in-out;
    transform: scale(1.05);
    border: 1px solid ${colors.silver};


  }
`;

export const PageNumberContainer = styled.div`
  width: 120px;
  background-color: ${colors.greyFade};
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const PageNumber = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ isActive }) => (isActive ? colors.primary2 : colors.greyFade)};;
  color: ${({ isActive }) => (isActive ? colors.white : colors.greyDark)};;
  cursor: pointer;

  &:hover {
    transition: 0.3s all ease-in-out;
    transform: scale(1.05);
    border: 1px solid ${colors.silver};
  }
`;
