import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { animated, useSpring } from "react-spring";
import Image from "next/image";
import { PlayCircle } from "react-feather";
import { useRouter } from "next/router";
import styled from "styled-components";

import SplashImage from "../../public/home_screen.png";
import logo from "../../public/logo.png";
import colors from "../constants/colors";
import { runFireWorks } from "../components/confetti/schoolPride";

const HomeWrapper = styled.div`
  max-width: 100vw;
  height: 100vh;
  background: radial-gradient(
    50.53% 50.53% at 50.23% 49.47%,
    #414d59 0%,
    #1d2631 100%
  );
`;
export default function Home() {
  const [windowSize, setWindowSize] = useState({});
  const router = useRouter();

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  useEffect(() => {
    setWindowSize(getWindowSize());
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);
    // runFireWorks();

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const transition = useSpring({
    from: { x: 0, y: -10 },
    to: { x: 0, y: 0 },
    loop: { reverse: true },
    config: { duration: 1000 },
  });
  const transition2 = useSpring({
    from: { opacity: 0, scale: 0 },
    to: { opacity: 1, scale: 1 },
  });
  const transition3 = useSpring({
    from: { x: -100, y: -100 },
    to: { x: 0, y: 0 },
  });

  return (
    <HomeWrapper>
      <animated.div style={transition3}>
        {windowSize.innerWidth > 1080 && (
          <div
            style={{
              position: "absolute",
              top: 60,
              right: 100,
              borderRadius: "50%",
              width: windowSize.innerWidth * 0.45,
              height: windowSize.innerWidth * 0.45,
              backgroundColor: colors.primary2,
            }}
          />
        )}
      </animated.div>
      <Container style={{ height: "90vh" }}>
        <Row className="d-flex align-items-center">
          <Col sm="12" md="6" lg="6">
            <Image src={logo} width={140} height={60} />
          </Col>
          <Col
            sm="12"
            md="6"
            lg="6"
            className={
              windowSize.innerWidth > 770
                ? "d-flex justify-content-end"
                : "d-flex"
            }
          >
            <Button
              style={{
                width: 100,
                backgroundColor: colors.primary2,
                borderColor: colors.primary2,
                marginRight: 10,
              }}
              onMouseOver={(e) => {
                e.target.style.opacity = 0.7;
              }}
              onMouseOut={(e) => {
                e.target.style.opacity = 1;
              }}
              onClick={() => {
                router.push("/auth/login");
              }}
            >
              Login
            </Button>
            <Button
              style={{
                width: 100,
                color: colors.primary2,
                borderColor: colors.primary2,
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = colors.greyFade;
                e.target.style.borderColor = colors.white;
                e.target.style.color = colors.dark;
                // e.target.style.opacity = 0.7;
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.borderColor = colors.primary2;
                e.target.style.color = colors.primary2;
                // e.target.style.opacity = 1;
              }}
              variant="outline-secondary"
              onClick={() => {
                router.push("/auth/register");
              }}
            >
              Register
            </Button>
          </Col>
        </Row>
        <Row
          style={{
            flexDirection:
              windowSize.innerWidth > 770 ? "row" : "column-reverse",
            justifyContent: "space-evenly",
          }}
          className="h-100 d-flex align-items-center"
        >
          <Col sm="12" md="5" lg="5" className="p-100">
            <animated.div style={transition2}>
              <h1
                style={{
                  color: colors.white,
                  fontWeight: "bolder",
                  fontFamily: "revert",
                }}
              >
                Purchasing With Us Is Pleasure, Fun And Joy{" "}
              </h1>
              <p
                style={{
                  color: colors.greyFade,
                  opacity: 0.7,
                  fontWeight: 600,
                  fontFamily: "revert-layer",
                  fontSize: 20,
                }}
              >
                You want to buy online. You are in the right pleace just start
                shopping
              </p>
              <Button
                style={{
                  backgroundColor: colors.primary2,
                  borderRadius: 30,
                  paddingRight: 20,
                  paddingLeft: 30,
                  paddingTop: 10,
                  paddingBottom: 10,
                  // boxShadow: `5px 5px 9px ${colors.silver}`,
                }}
                onMouseOver={(e) => {
                  e.target.style.opacity = 0.7;
                }}
                onMouseOut={(e) => {
                  e.target.style.opacity = 1;
                }}
                onClick={() => {
                  router.push("/products");
                }}
              >
                Start shopping <PlayCircle color={colors.warning} size={25} />
              </Button>
            </animated.div>
          </Col>
          <Col sm="12" md="7" lg="7">
            <animated.div style={transition}>
              <Image
                layout="responsive"
                objectFit="contain"
                src={SplashImage}
              />
            </animated.div>
          </Col>
        </Row>
      </Container>
    </HomeWrapper>
  );
}
