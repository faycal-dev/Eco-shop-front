import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  FormControl,
  Button,
  Spinner,
} from "react-bootstrap";
import { CheckCircle, Image as Fimage } from "react-feather";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import colors from "../../constants/colors";
import styled from "styled-components";
import SweetAlert from "react-bootstrap-sweetalert";

import Layout from "../../hocs/Layout";
import { API_URL } from "../../config";
import { logout } from "../../actions/auth";
import userimg from "../../../public/default.png";
import axios from "axios";

const ChangePhotoButton = styled.div`
  margin-top: 1rem;
  padding: 8px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.primary2};
  border: 2px solid ${colors.primary2};
  cursor: pointer;
  font-weight: 600;

  &:hover {
    transition: 0.3s all ease-in-out;
    color: ${colors.white};
    background-color: ${colors.primary2};
  }
`;

function User({ user }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const loading = useSelector((state) => state.auth.loading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [imageSrc, setImageSrc] = useState(
    user?.image ===
      "https://res.cloudinary.com/dz8sjnsz4/image/upload/v1/media/images/user/default.png" ||
      !user?.image
      ? userimg
      : user.image
  );
  const [User, setUser] = useState(user);
  const [password, setPassword] = useState({ old: "", new: "" });
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState({ buttonType: "", state: false });
  const [alert, setAlert] = useState({
    title: "",
    body: "",
    show: false,
    success: false,
  });

  const handleDisplayFileDetails = async (e) => {
    if (e.target?.files) {
      // console.log(inputRef.current.files[0])
      const body = new FormData();
      body.append("image", e.target?.files[0], e.target?.files[0].name);

      setIsLoading({ buttonType: "image", state: true });

      try {
        const res = await axios({
          method: "put",
          url: "/api/account/changeImage",
          data: body,
          headers: { "Content-Type": "multipart/form-data" },
          // timeout: 4000
        });
        const data = await res.json();

        if (res.status === 200) {
          setAlert({
            title: "Success",
            body: data.message,
            show: true,
            success: true,
          });
          setImageSrc(inputRef.current.files[0]);
        } else {
          setAlert({
            title: "Failed to update user image",
            body: data.error,
            show: true,
            success: false,
          });
        }
      } catch (err) {
        setAlert({
          title: "Failed to update user image",
          body: "something went wrong",
          show: true,
          success: false,
        });
      }
      setIsLoading({ buttonType: "", state: false });
    }
  };

  const onChange = (e) => setUser({ ...User, [e.target.name]: e.target.value });

  const ChangePasswordHandler = async (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      old_password: password.old,
      new_password: password.new,
    });

    setIsLoading({ buttonType: "password", state: true });

    try {
      const res = await fetch("/api/account/changePassword", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });
      const data = await res.json();

      if (res.status === 200) {
        setAlert({
          title: "Success",
          body: data.message,
          show: true,
          success: true,
        });
        dispatch(logout());
        router.push("/products");
      } else {
        setAlert({
          title: "Failed to update user",
          body: data.error,
          show: true,
          success: false,
        });
      }
    } catch (err) {
      setAlert({
        title: "Failed to update user",
        body: "something went wrong",
        show: true,
        success: false,
      });
    }
    setIsLoading({ buttonType: "", state: false });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const body = JSON.stringify({
      User,
    });
    setIsLoading({ buttonType: "email", state: true });

    try {
      const res = await fetch("/api/account/changeCredentials", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });
      const data = await res.json();

      if (res.status === 200) {
        setUser(data.user);
        setAlert({
          title: "Success",
          body: data.message,
          show: true,
          success: true,
        });
      } else {
        setAlert({
          title: "Failed to update user",
          body: data.error,
          show: true,
          success: false,
        });
      }
    } catch (err) {
      setAlert({
        title: "Failed to update user",
        body: "something went wrong",
        show: true,
        success: false,
      });
    }
    setIsLoading({ buttonType: "", state: false });
  };

  // if (typeof window !== "undefined" && !loading && !isAuthenticated) {
  //   router.push("/auth/login");
  // }

  return (
    <Layout
      title="Profile"
      content="The profile page where the user can add and modify his informations "
    >
      <Container
        className="p-4"
        style={{
          width: "80%",
          backgroundColor: colors.white,
          borderRadius: 10,
          boxShadow: `5px 5px 5px ${colors.greyFade}`,
        }}
      >
        <Row>
          <Col xs="12" md="5" className="d-flex justify-content-center">
            <div>
              <Image
                src={imageSrc}
                width={150}
                height={150}
                style={{ borderRadius: 80 }}
              />
              <FormControl
                type="file"
                className="d-none"
                ref={inputRef}
                onChange={handleDisplayFileDetails}
              />
              {isLoading.buttonType === "image" && isLoading.state ? (
                <ChangePhotoButton>Changing...</ChangePhotoButton>
              ) : (
                <ChangePhotoButton
                  onClick={() => {
                    inputRef.current?.click();
                  }}
                >
                  <Fimage className="mx-1" size={20} />
                  Change photo
                </ChangePhotoButton>
              )}
            </div>
            {User?.is_verified && (
              <div
                style={{
                  position: "relative",
                  left: -10,
                  top: 5,
                  display: "flex",
                  flexDirection: "row",
                  color: colors.primary2,
                }}
              >
                <CheckCircle size={20} color={colors.primary2} />
                <small
                  style={{ marginTop: -3 }}
                  className="fs-6 fw-semibold mx-1"
                >
                  verified
                </small>
              </div>
            )}
          </Col>
          <Col
            style={{ display: "flex", flexDirection: "column" }}
            xs="12"
            md="7"
          >
            <small style={{ color: colors.dark }} className="fs-4 fw-semibold">
              {User?.email}
            </small>
            <small
              style={{
                color: colors.primary2,
                borderBottom: `1px solid ${colors.greyFade}`,
                paddingBottom: "1rem",
              }}
              className="fs-7 fw-semibold"
            >
              {User?.full_name}
            </small>
            <form
              style={{
                width: "100%",
                paddingBottom: "1rem",
                borderBottom: `1px solid ${colors.greyFade}`,
              }}
              onSubmit={onSubmit}
            >
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
                  placeholder="Email"
                  onChange={onChange}
                  value={User?.email}
                />
              </div>
              <div className="form-group">
                <label className="form-label mt-3" htmlFor="full_name">
                  <strong
                    style={{
                      color: colors.info,
                      opacity: 0.7,
                      fontWeight: 400,
                      fontFamily: "revert-layer",
                      fontSize: 15,
                    }}
                  >
                    Full name
                  </strong>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="full_name"
                  placeholder="Full name"
                  onChange={onChange}
                  value={User?.full_name}
                />
              </div>
              {isLoading.buttonType === "email" && isLoading.state ? (
                <Button
                  className="px-4 py-2"
                  style={{
                    backgroundColor: colors.primary2,
                    fontWeight: 600,
                    marginTop: "1rem",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = colors.white;
                    e.target.style.color = colors.primary2;
                    e.target.style.border = `2px solid ${colors.primary2}`;
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = colors.primary2;
                    e.target.style.color = colors.white;
                  }}
                >
                  Changing...
                </Button>
              ) : (
                <Button
                  className="px-4 py-2"
                  style={{
                    backgroundColor: colors.primary2,
                    fontWeight: 600,
                    marginTop: "1rem",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = colors.white;
                    e.target.style.color = colors.primary2;
                    e.target.style.border = `2px solid ${colors.primary2}`;
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = colors.primary2;
                    e.target.style.color = colors.white;
                  }}
                  type="submit"
                >
                  Change
                </Button>
              )}
            </form>
            <form style={{ width: "100%" }} onSubmit={ChangePasswordHandler}>
              <div className="form-group">
                <label className="form-label mt-3" htmlFor="Old_password">
                  <strong
                    style={{
                      color: colors.info,
                      opacity: 0.7,
                      fontWeight: 400,
                      fontFamily: "revert-layer",
                      fontSize: 15,
                    }}
                  >
                    Old password
                  </strong>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="Old_password"
                  placeholder="Enter your Old password"
                  onChange={(e) => {
                    setPassword({ ...password, old: e.target.value });
                  }}
                />
              </div>
              <div className="form-group">
                <label className="form-label mt-3" htmlFor="New_password">
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
                  name="New_password"
                  placeholder="Enter your new password"
                  onChange={(e) => {
                    setPassword({ ...password, new: e.target.value });
                  }}
                />
              </div>
              {isLoading.buttonType === "password" && isLoading.state ? (
                <Button
                  className="px-4 py-2"
                  style={{
                    backgroundColor: colors.danger,
                    fontWeight: 600,
                    marginTop: "1rem",
                    border: `2px solid ${colors.danger}`,
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = colors.white;
                    e.target.style.color = colors.danger;
                    e.target.style.border = `2px solid ${colors.danger}`;
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = colors.danger;
                    e.target.style.color = colors.white;
                  }}
                >
                  Changing...
                </Button>
              ) : (
                <Button
                  className="px-4 py-2"
                  style={{
                    backgroundColor: colors.danger,
                    fontWeight: 600,
                    marginTop: "1rem",
                    border: `2px solid ${colors.danger}`,
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = colors.white;
                    e.target.style.color = colors.danger;
                    e.target.style.border = `2px solid ${colors.danger}`;
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = colors.danger;
                    e.target.style.color = colors.white;
                  }}
                  type="submit"
                >
                  Change password
                </Button>
              )}
            </form>
          </Col>
        </Row>
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
          }}
          confirmBtnStyle={{ backgroundColor: colors.primary2, width: "40%" }}
        >
          <p className="sweet-alert-text">{alert.body}</p>
        </SweetAlert>
      </Container>
    </Layout>
  );
}

export default User;

export async function getServerSideProps(context) {
  const access = context.req.cookies.access;
  try {
    const apiRes = await fetch(`${API_URL}/account/user/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access}`,
      },
    });
    const data = await apiRes.json();

    if (apiRes.status === 200) {
      return {
        props: {
          user: data.user,
        },
      };
    } else {
      return {
        props: {
          user: null,
        },
      };
    }
  } catch (err) {
    return {
      props: {
        user: null,
      },
    };
  }
}
