import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { check_auth_status } from "../actions/auth";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import SideBar from "../components/SideBare/SideBar";
import styled from "styled-components";

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
        backgroundColor: "#f6f9fc",
        minHeight: "100vh",
      }}
    >
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Head>
      <Navbar toggle={toggle} />
      <SideBar isOpen={isOpen} toggle={toggle} />
      <div className="mt-3 pb-4">{children}</div>
    </div>
  );
};

Layout.defaultProps = {
  title: "Eco Shop",
  content: "The landing page for the eco shop website",
};

export default Layout;
