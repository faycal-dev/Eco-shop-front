import { useState } from "react";
import {
  List,
  Heart,
  ShoppingCart,
  CreditCard,
  Bell,
  Clock,
} from "react-feather";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
import Link from "next/link";

import {
  Nav,
  NavLogo,
  NavbarContainer,
  MobileIcon,
  NavItem,
  NavLinks,
  NavMenu,
  DropDownContainer,
  DropDownHeader,
  DropDownListContainer,
  DropDownList,
  ListItem,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";


const Navbar = ({ toggle }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  // const [isOpen, setIsOpen] = useState(false);
  // const [selectedOption, setSelectedOption] = useState(null);

  const logoutHandler = () => {
    if (dispatch && dispatch !== null && dispatch !== undefined)
      dispatch(logout());
  };

  // const toggling = () => setIsOpen(!isOpen);

  // const onOptionClicked = (value) => () => {
  //   setSelectedOption(value);
  //   setIsOpen(false);
  //   console.log(selectedOption);
  // };

  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <Nav>
        <NavbarContainer>
          <Link href="/">
            <NavLogo>EcoShop</NavLogo>
          </Link>
          <MobileIcon onClick={toggle}>
            <List size={28} />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <Link href="/products">
                <NavLinks isActive={router.pathname === "/products"}>
                  <ShoppingCart size={20} style={{ marginRight: 5 }} />
                  Shop
                </NavLinks>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="#deets">
                <NavLinks isActive={router.pathname === "/wishList"}>
                  <Heart size={20} style={{ marginRight: 5 }} /> WishList
                </NavLinks>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="#deets">
                <NavLinks isActive={router.pathname === "/checkout"}>
                  <CreditCard size={20} style={{ marginRight: 5 }} /> Checkout
                </NavLinks>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="#deets">
                <NavLinks isActive={router.pathname === "/notifications"}>
                  <Bell size={20} style={{ marginRight: 5 }} />
                  Notifications
                </NavLinks>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="#deets">
                <NavLinks isActive={router.pathname === "/history"}>
                  <Clock size={20} style={{ marginRight: 5 }} /> Orders
                </NavLinks>
              </Link>
            </NavItem>

            {/* <DropDownContainer>
              <DropDownHeader onClick={toggling}>
                {" "}
                <Sliders size={20} style={{ marginRight: 5 }} /> Categories
              </DropDownHeader>
              <DropDownListContainer isOpen={isOpen}>
                <DropDownList>
                  {categories.map((option) => (
                    <Link key={option.slug} href={`category/${option.slug}`}>
                      <ListItem isActive={router.pathname === "/category"}>
                        {option.name}
                      </ListItem>
                    </Link>
                  ))}
                </DropDownList>
              </DropDownListContainer>
            </DropDownContainer> */}
          </NavMenu>
          <NavBtn>
            <NavBtnLink onClick={logoutHandler}>Logout</NavBtnLink>
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </div>
  );
};

export default Navbar;
