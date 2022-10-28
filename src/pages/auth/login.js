import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { login, reset_register_success } from "../../actions/auth";
import { Button, Col, Container, Row } from "react-bootstrap";
import { animated, useSpring } from "react-spring";
import { Check } from "react-feather";
import SweetAlert from "react-bootstrap-sweetalert";
import Spinner from "react-bootstrap/Spinner";

import UserLoginPng from "../../../public/userlog.jpg";
import logo from "../../../public/logo.png";
import colors from "../../constants/colors";

const LoginPage = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [windowSize, setWindowSize] = useState({});

  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const auth_response = useSelector((state) => state.auth.auth_response);


  const [ShowAllert, setShowAllert] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState({
    title: "",
    body: "",
    show: false,
    success: false,
  });

  const { email, password } = formData;

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

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined)
      dispatch(reset_register_success());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated && !loading && ShowAllert) {
      setAlert({
        ...alert,
        title: "Login failed",
        body: auth_response,
        show: true,
      });
    }
  }, [isAuthenticated, loading]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (dispatch && dispatch !== null && dispatch !== undefined)
      dispatch(login(email, password));
    setShowAllert(true);
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      console.log("enter");
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const transition = useSpring({
    from: { opacity: 0, scale: 0 },
    to: { opacity: 1, scale: 1 },
  });

  if (typeof window !== "undefined" && isAuthenticated) {
    router.push("/products");
  }

  return (
    <Container style={{ maxHeight: "100vh" }}>
      <Row>
        {windowSize.innerWidth > 993 && (
          <Col md="6" lg="8">
            <Image src={logo} width={140} height={60} />
            <animated.div style={transition}>
              <Image
                layout="responsive"
                objectFit="contain"
                src={UserLoginPng}
              />
            </animated.div>
          </Col>
        )}

        <Col
          sm="12"
          md="12"
          lg="4"
          className="d-flex align-items-start"
          style={{
            backgroundColor: colors.whiteSmoke,
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: 30,
            paddingTop: 100,
            height: "100vh",
          }}
        >
          <h3
            style={{
              color: colors.info,
              fontWeight: "bolder",
              fontFamily: "revert",
            }}
          >
            Welcome to Eco Shop👋
          </h3>
          <p
            style={{
              color: colors.info,
              opacity: 0.7,
              fontWeight: 600,
              fontFamily: "revert-layer",
              fontSize: 18,
            }}
          >
            Please sign-in to your account and start the adventure
          </p>
          <form style={{ width: "100%" }} onSubmit={onSubmit}>
            <div className="form-group">
              <label className="form-label mt-3" htmlFor="email">
                <strong
                  style={{
                    color: colors.info,
                    opacity: 0.7,
                    fontWeight: 400,
                    fontFamily: "revert-layer",
                    fontSize: 15,
                  }}
                >
                  Email
                </strong>
              </label>
              <input
                className="form-control"
                type="text"
                name="email"
                placeholder="Email*"
                onChange={onChange}
                value={email}
                required
              />
            </div>
            <div className="form-group">
              <label
                className="form-label mt-3 d-flex"
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                htmlFor="password"
              >
                <strong
                  style={{
                    color: colors.info,
                    opacity: 0.7,
                    fontWeight: 400,
                    fontFamily: "revert-layer",
                    fontSize: 15,
                  }}
                >
                  Password
                </strong>
                <Link href="/auth/forgotPassword">
                  <a
                    style={{
                      color: colors.primary2,
                      textDecoration: "none",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.opacity = 0.7;
                    }}
                    onMouseOut={(e) => {
                      e.target.style.opacity = 1;
                    }}
                  >
                    Forgot password?
                  </a>
                </Link>
              </label>
              <input
                className="form-control"
                type={passwordType}
                name="password"
                placeholder="Password*"
                onChange={onChange}
                value={password}
                minLength="8"
                required
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <div
                onClick={togglePassword}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  border: `1px solid ${colors.silver}`,
                  backgroundColor:
                    passwordType == "password" ? colors.white : colors.primary2,
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  paddingTop: 3,
                }}
              >
                {passwordType !== "password" && (
                  <Check color={colors.white} size={18} />
                )}
              </div>
              <p
                style={{
                  color: colors.info,
                  opacity: 0.7,
                  fontWeight: 400,
                  fontFamily: "revert-layer",
                  fontSize: 15,
                  marginTop: 15,
                  marginLeft: 10,
                }}
              >
                Show password
              </p>
            </div>
            {loading ? (
              <Button
                style={{ backgroundColor: colors.primary2, width: "100%" }}
                disabled
              >
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              </Button>
            ) : (
              <Button
                style={{ backgroundColor: colors.primary2, width: "100%" }}
                onMouseOver={(e) => {
                  e.target.style.opacity = 0.7;
                }}
                onMouseOut={(e) => {
                  e.target.style.opacity = 1;
                }}
                type="submit"
              >
                Login
              </Button>
            )}
            <p className="mt-2">
              Not registred yet?{" "}
              <Link href="/auth/register">
                <a
                  style={{
                    color: colors.primary2,
                    textDecoration: "none",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.opacity = 0.7;
                  }}
                  onMouseOut={(e) => {
                    e.target.style.opacity = 1;
                  }}
                >
                  Create an account
                </a>
              </Link>
            </p>
          </form>
        </Col>
      </Row>
      {!loading && (
        <SweetAlert
          error={!alert.success}
          success={alert.success}
          title={alert.title}
          show={alert.show}
          onConfirm={() => {
            setAlert({
              ...alert,
              show: false,
              title: "",
              body: "",
            });
            setShowAllert(false);
          }}
          confirmBtnStyle={{ backgroundColor: colors.primary2, width: "40%" }}
        >
          <p className="sweet-alert-text">{alert.body}</p>
        </SweetAlert>
      )}
    </Container>
  );
};

export default LoginPage;
