import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { check_auth_status } from "../actions/auth";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import SideBar from "../components/SideBare/SideBar";
import colors from "../constants/colors";

const Layout = ({ title, content, children }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined)
      dispatch(check_auth_status());
  }, [dispatch]);

  return (
    <div
      
      style={{
        backgroundColor:"#F5F5F5",
        minHeight: "100vh",
      }}
    >
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Head>
      <Navbar toggle={toggle} />
      <SideBar isOpen={isOpen} toggle={toggle} />
      <div className="container mt-3">{children}</div>
    </div>
  );
};

Layout.defaultProps = {
  title: "Eco Shop",
  content: "The landing page for the eco shop website",
};

export default Layout;
