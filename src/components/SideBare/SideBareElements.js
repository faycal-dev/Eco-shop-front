import styled from "styled-components";
import colors from "../../constants/colors";

export const SideBareContainer = styled.aside`
  position: fixed;
  z-index: 20;
  width: 100%;
  height: 90%;
  background: rgba(0, 0, 0, 0.8);
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  backdrop-filter: blur(5px);
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  top: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
`;

export const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

export const SideBareWrapper = styled.div`
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const SideBarMenu = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 80px);
  text-align: center;

  @media screen and (max-width: 480px) {
    grid-template-rows: repeat(6, 60);
  }
`;

export const SideBarLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  color: #fff;
  cursor: pointer;
  &:hover {
    color: ${colors.primary2};
    transition: 0.2s ease-in-out;
    transform: scale(1.1);
  }
`;

export const SideBtnWrap = styled.div`
  display: flex;
  justify-content: center;
`;
export const SideBarRoute = styled.a`
  border-radius: 50px;
  background: ${({ isAuthenticated }) =>
    isAuthenticated ? colors.danger : colors.primary2};
  white-space: nowrap;
  padding: 10px 25px;
  color: ${colors.white};
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    opacity: 0.9;
    color: ${colors.greyFade2};
    transform: scale(1.1);
  }
`;
