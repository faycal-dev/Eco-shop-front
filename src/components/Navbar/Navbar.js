import {
  List,
  Heart,
  ShoppingCart,
  ShoppingBag,
  Clock,
  User,
} from "react-feather";
import { useSelector } from "react-redux";
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
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // const [isOpen, setIsOpen] = useState(false);
  // const [selectedOption, setSelectedOption] = useState(null);

  const logoutHandler = () => {
    if (dispatch && dispatch !== null && dispatch !== undefined)
      dispatch(logout());
  };

  const loginHandler = () => {
    router.push("/auth/login");
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
                  <ShoppingBag size={20} style={{ marginRight: 5 }} />
                  Shop
                </NavLinks>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/wishlist">
                <NavLinks isActive={router.pathname === "/wishlist"}>
                  <Heart size={20} style={{ marginRight: 5 }} /> WishList
                </NavLinks>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/cart">
                <NavLinks isActive={router.pathname === "/cart"}>
                  <ShoppingCart size={20} style={{ marginRight: 5 }} /> Cart
                </NavLinks>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/orders">
                <NavLinks isActive={router.pathname === "/orders"}>
                  <Clock size={20} style={{ marginRight: 5 }} /> Orders
                </NavLinks>
              </Link>
            </NavItem>
            {isAuthenticated && (
              <NavItem>
                <Link href="/user">
                  <NavLinks isActive={router.pathname === "/user"}>
                    <User size={20} style={{ marginRight: 5 }} />
                    Profile
                  </NavLinks>
                </Link>
              </NavItem>
            )}

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
            {isAuthenticated ? (
              <NavBtnLink loggedIn={isAuthenticated} onClick={logoutHandler}>
                Logout
              </NavBtnLink>
            ) : (
              <NavBtnLink loggedIn={isAuthenticated} onClick={loginHandler}>
                Login
              </NavBtnLink>
            )}
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </div>
  );
};

export default Navbar;
