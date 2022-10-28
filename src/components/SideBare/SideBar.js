import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
import {
  Icon,
  SideBareContainer,
  SideBarLink,
  SideBareWrapper,
  SideBarMenu,
  SideBarRoute,
  SideBtnWrap,
} from "./SideBareElements";
import { useRouter } from "next/router";
import {
  XCircle,
  ShoppingBag,
  ShoppingCart,
  CreditCard,
  Bell,
  Clock,
} from "react-feather";

const SideBar = ({ isOpen, toggle }) => {
  const router = useRouter();
  const dispatch = useDispatch();


  const logoutHandler = () => {
    if (dispatch && dispatch !== null && dispatch !== undefined)
      dispatch(logout());
  };

  return (
    <SideBareContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <XCircle color="white" onClick={toggle} />
      </Icon>
      <SideBareWrapper>
        <SideBarMenu>
          <Link href="/products">
            <SideBarLink isActive={router.pathname === "/products"}>
              <ShoppingCart size={20} style={{ marginRight: 5 }} /> Shop
            </SideBarLink>
          </Link>
          <Link href="#deets">
            <SideBarLink isActive={router.pathname === "/wishList"}>
              <ShoppingBag size={20} style={{ marginRight: 5 }} />
              WishList
            </SideBarLink>
          </Link>
          <Link href="#deets">
            <SideBarLink isActive={router.pathname === "/checkout"}>
              <CreditCard size={20} style={{ marginRight: 5 }} />
              Checkout
            </SideBarLink>
          </Link>
          <Link href="#deets">
            <SideBarLink isActive={router.pathname === "/notifications"}>
              <Bell size={20} style={{ marginRight: 5 }} />
              Notifications
            </SideBarLink>
          </Link>
          <Link href="#deets">
            <SideBarLink isActive={router.pathname === "/history"}>
              <Clock size={20} style={{ marginRight: 5 }} />
              Orders
            </SideBarLink>
          </Link>
        </SideBarMenu>
        <SideBtnWrap>
          <SideBarRoute onClick={logoutHandler}>Log out</SideBarRoute>
        </SideBtnWrap>
      </SideBareWrapper>
    </SideBareContainer>
  );
};

export default SideBar;
