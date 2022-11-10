import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
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
  Clock,
  Heart,
  User,
} from "react-feather";

const SideBar = ({ isOpen, toggle }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
              <ShoppingBag size={20} style={{ marginRight: 5 }} /> Shop
            </SideBarLink>
          </Link>
          <Link href="/wishlist">
            <SideBarLink isActive={router.pathname === "/wishList"}>
              <Heart size={20} style={{ marginRight: 5 }} />
              WishList
            </SideBarLink>
          </Link>
          <Link href="/cart">
            <SideBarLink isActive={router.pathname === "/cart"}>
              <ShoppingCart size={20} style={{ marginRight: 5 }} />
              Cart
            </SideBarLink>
          </Link>
          <Link href="/orders">
            <SideBarLink isActive={router.pathname === "/orders"}>
              <Clock size={20} style={{ marginRight: 5 }} />
              Orders
            </SideBarLink>
          </Link>
          {isAuthenticated && (
            <Link href="/user">
              <SideBarLink isActive={router.pathname === "/user"}>
                <User size={20} style={{ marginRight: 5 }} />
                Profile
              </SideBarLink>
            </Link>
          )}
        </SideBarMenu>
        {isAuthenticated ? (
          <SideBtnWrap>
            <SideBarRoute isAuthenticated={true} onClick={logoutHandler}>
              Log out
            </SideBarRoute>
          </SideBtnWrap>
        ) : (
          <SideBtnWrap>
            <SideBarRoute
              isAuthenticated={false}
              onClick={() => {
                router.push("/auth/login");
              }}
            >
              Log in
            </SideBarRoute>
          </SideBtnWrap>
        )}
      </SideBareWrapper>
    </SideBareContainer>
  );
};

export default SideBar;
