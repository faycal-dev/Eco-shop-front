import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { reset_password_from_email } from "../../actions/auth";
import { Button, Col, Container, Row } from "react-bootstrap";
import { animated, useSpring } from "react-spring";
import SweetAlert from "react-bootstrap-sweetalert";
import Spinner from "react-bootstrap/Spinner";

import ForgotPwd from "../../../public/ForgotPassword.png";
import logo from "../../../public/logo.png";
import colors from "../../constants/colors";

export default function ResetPassword() {
  const [windowSize, setWindowSize] = useState({});

  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const auth_response = useSelector((state) => state.auth.auth_response);
  const reset_password_from_email_success = useSelector(
    (state) => state.auth.reset_password_from_email_success
  );

  const [ShowAllert, setShowAllert] = useState(false);
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({
    title: "",
    body: "",
    show: false,
    success: false,
  });

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

  const transition = useSpring({
    from: { opacity: 0, scale: 0 },
    to: { opacity: 1, scale: 1 },
  });

  useEffect(() => {
    if (!reset_password_from_email_success && !loading && ShowAllert) {
      setAlert({
        ...alert,
        title: "Resetting password failed",
        body: auth_response,
        show: true,
        success: false,
      });
    } else if (reset_password_from_email_success && !loading && ShowAllert) {
      setAlert({
        ...alert,
        title: "Success",
        body: auth_response,
        show: true,
        success: true,
      });
      router.push("/auth/login");
    }
  }, [reset_password_from_email_success, loading]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (router.query.token_valid === "True") {
      if (dispatch && dispatch !== null && dispatch !== undefined)
        dispatch(
          reset_password_from_email(
            password,
            router.query.token,
            router.query.uidb64
          )
        );
      setShowAllert(true);
    } else if (router.query.token_valid === "False") {
      setAlert({
        ...alert,
        title: "Invalid Token",
        body: "",
        show: true,
        success: false,
      });
    }
  };

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
                height={windowSize.innerWidth * 0.43}
                width={windowSize.innerWidth * 0.5}
                quality={100}
                // layout="fill"
                objectFit="scale-down"
                src={ForgotPwd}
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
            paddingTop: 200,
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
            Reset your password
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
            Please write your new password here
          </p>
          <form style={{ width: "100%" }} onSubmit={onSubmit}>
            <div className="form-group mb-5">
              <label className="form-label mt-3" htmlFor="password">
                <strong
                  style={{
                    color: colors.info,
                    opacity: 0.7,
                    fontWeight: 400,
                    fontFamily: "revert-layer",
                    fontSize: 15,
                  }}
                >
                  New password
                </strong>
              </label>
              <input
                className="form-control"
                type="text"
                name="password"
                placeholder="Password*"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                required
              />
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
                Submit
              </Button>
            )}
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
}
