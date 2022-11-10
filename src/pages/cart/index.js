import Image from "next/image";
import React, { useState } from "react";
import { Row, Col, Container, Spinner } from "react-bootstrap";
import { Star, X } from "react-feather";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import SweetAlert from "react-bootstrap-sweetalert";

import { API_URL } from "../../config";
import getStripe from "../../config/getStripe";
import colors from "../../constants/colors";
import Layout from "../../hocs/Layout";

const OrderButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  color: ${colors.white};
  background-color: ${colors.primary2};
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    transition: 0.1s all ease-in-out;
    transform: scale(1.02);
    opacity: 0.8;
  }
`;
const RemoveButton = styled.div`
  width: 70%;
  max-width: 130px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0.5rem;
  color: ${colors.white};
  background-color: ${colors.primary2};
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 1rem;

  &:hover {
    transition: 0.1s all ease-in-out;
    transform: scale(1.02);
  }
`;
const FreeShippingPill = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  color: ${colors.success};
  background-color: ${colors.greyFade2};
  border-radius: 20px;
  font-weight: 500;
  margin-top: 1rem;
  font-size: 0.8rem;
`;

const ItemContainer = styled.div`
  width: 100%;
  border-radius: 5px;
  background-color: ${colors.white};
  margin-bottom: 1rem;
  box-shadow: 5px 5px 10px ${colors.greyFade};
  display: flex;
  flex-direction: row;

  &:hover {
    transition: 0.5s all ease-in-out;
    transform: scale(1.02);
  }
`;

function Cart({ cart }) {
  const [cartItems, setCartItems] = useState(cart[0]?.items ?? []);
  const [totalPrice, setTotalPrice] = useState(cart[0]?.total_price);
  const [isLoading, setIsLoading] = useState(false);

  const [isRemouveLoading, setIsRemouveLoading] = useState({
    state: false,
    id: null,
  });
  const [alert, setAlert] = useState({
    title: "",
    body: "",
    show: false,
    success: false,
  });
  const today = new Date();
  today.setDate(today.getDate() + 3);
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  const handleRemove = async (id) => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    } else {
      setIsRemouveLoading({
        state: true,
        id: id,
      });
      try {
        const body = JSON.stringify({ id: id });
        const res = await fetch("api/shop/remove_from_cart", {
          method: "DELETE",
          headers: {
            Accept: "application/json",
          },
          body: body,
        });
        const data = await res.json();
        setIsRemouveLoading({
          state: false,
          id: null,
        });
        setAlert({
          title: "Success",
          body: data.success,
          show: true,
          success: true,
        });

        const temporaryItems = [...cartItems];
        const indexOfElement = temporaryItems.findIndex((object) => {
          return object.product.id === id;
        });
        temporaryItems.splice(indexOfElement, 1);
        setCartItems(temporaryItems);
      } catch (error) {
        setIsRemouveLoading({
          state: false,
          id: null,
        });

        setAlert({
          title: "Failed to Remove product item",
          body: "",
          show: true,
          success: false,
        });
      }
    }
  };

  const handleQuantityChange = async (id, qty) => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    } else {
      try {
        const body = JSON.stringify({ id: id, qty: qty });
        const res = await fetch("api/shop/change_cart_item", {
          method: "PUT",
          headers: {
            Accept: "application/json",
          },
          body: body,
        });
        const data = await res.json();
        setAlert({
          title: "Success",
          body: data.success,
          show: true,
          success: true,
        });

        const temporaryItems = [...cartItems];
        const indexOfElement = temporaryItems.findIndex((object) => {
          return object.product.id === id;
        });
        const total =
          parseFloat(totalPrice) +
          (parseInt(qty) -
            parseFloat(temporaryItems[indexOfElement].quantity)) *
            parseFloat(temporaryItems[indexOfElement].price);

        setTotalPrice(total);
        temporaryItems[indexOfElement].quantity = qty;
        setCartItems(temporaryItems);
      } catch (error) {
        setAlert({
          title: "Failed to Remove product item",
          body: "",
          show: true,
          success: false,
        });
      }
    }
  };

  const handleCheckout = async () => {
    if (cartItems?.length > 0 ){
        setIsLoading(true);
        const stripe = await getStripe();
    
        const response = await fetch("/api/stripe/stripe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartItems),
        });
    
        if (response.statusCode === 500) {
          setIsLoading(false);
          return;
        }
    
        const data = await response.json();
    
        await stripe.redirectToCheckout({ sessionId: data.id });
        setIsLoading(false);
    }
  };

//   if (typeof window !== "undefined" && !loading && !isAuthenticated) {
//     router.push("/auth/login");
//   }

  return (
    <Layout title="Cart" content="List of all the products added to the cart">
      <Container>
        <Row>
          <Col sm="12" md="12" lg="8">
            {cartItems.map((item) => (
              <ItemContainer key={item.product.id}>
                <Row style={{ width: "100%" }} className="p-2">
                  <Col
                    sm="12"
                    md="4"
                    className="p-5"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        router.push({
                          pathname: `products/${encodeURIComponent(
                            item.product.slug
                          )}`,
                        });
                      }}
                    >
                      <Image
                        src={item.product.product_image[0].image}
                        width={120}
                        height={120}
                        quality={100}
                      />
                    </div>
                  </Col>
                  <Col sm="12" md="5" className="py-3">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        height: "100%",
                      }}
                    >
                      <small
                        style={{ color: colors.primary2 }}
                        className="fs-6 fw-semibold"
                      >
                        {item.product.title}
                      </small>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <small className="text-muted ">By</small>
                        <small
                          className="fw-semibold"
                          style={{
                            color: colors.primary2,
                            marginLeft: "0.5rem",
                            marginRight: "3rem",
                          }}
                        >
                          {item.product.brand}
                        </small>
                        <Star
                          size={18}
                          color={colors.warning}
                          fill={colors.warning}
                        />
                        <small
                          className="fw-semibold"
                          style={{
                            color: colors.warning,
                            marginLeft: "0.5rem",
                          }}
                        >
                          ({item.product.rating})
                        </small>
                      </div>
                      <small
                        className="fs-6 fw-normal"
                        style={{
                          color: item.product.is_active
                            ? colors.success
                            : colors.danger,
                        }}
                      >
                        {item.product.is_active ? "In stock" : "Not in stock"}
                      </small>
                      <div
                        style={{
                          display: "flex",
                          width: "200px",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <small className="text-muted fw-normal mb-1">
                          Qty: {item.quantity}
                        </small>
                        <Slider
                          trackStyle={{
                            backgroundColor: colors.primary2,
                            height: 5,
                          }}
                          handleStyle={{
                            borderColor: colors.primary2,
                            backgroundColor: colors.white,
                            opacity: 1,
                          }}
                          railStyle={{
                            backgroundColor: colors.primary2,
                            opacity: 0.2,
                            height: 5,
                          }}
                          dotStyle={{
                            backgroundColor: colors.white,
                          }}
                          activeDotStyle={{
                            borderColor: colors.primary2,
                            backgroundColor: colors.white,
                          }}
                          dots
                          min={1}
                          max={10}
                          defaultValue={item.quantity}
                          onAfterChange={(qty) =>
                            handleQuantityChange(item.product.id, qty)
                          }
                        />
                      </div>
                      <small className="text-muted fw-semibold">
                        Delivred by {today.toDateString()}
                      </small>
                    </div>
                  </Col>
                  <Col sm="12" md="3">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        borderLeft: `1px solid ${colors.greyFade}`,
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <small
                        style={{ color: colors.primary2 }}
                        className="fs-5 fw-semibold"
                      >
                        {parseFloat(item.price) * item.quantity} $
                      </small>
                      <FreeShippingPill>Free shipping</FreeShippingPill>
                      {isRemouveLoading.state &&
                      isRemouveLoading.id === item.product.id ? (
                        <RemoveButton onClick={() => {}}>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        </RemoveButton>
                      ) : (
                        <RemoveButton
                          onClick={() => handleRemove(item.product.id)}
                        >
                          <X size={18} color={colors.white} /> Remove
                        </RemoveButton>
                      )}
                    </div>
                  </Col>
                </Row>
              </ItemContainer>
            ))}
          </Col>
          <Col sm="12" md="12" lg="4">
            <div
              style={{
                width: "100%",
                borderRadius: 5,
                padding: "1rem",
                backgroundColor: colors.white,
                boxShadow: `5px 5px 10px  ${colors.greyFade}`,
              }}
            >
              <p
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: colors.dark,
                }}
              >
                Price details
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
                className="py-3"
              >
                <small className="text-muted fs-6 fw-normal">Total price</small>
                <small className="text-muted fs-6 fw-normal">
                  {totalPrice}$
                </small>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
                className="pb-3"
              >
                <small className="text-muted fs-6 fw-normal">Discount</small>
                <small
                  style={{ color: colors.success }}
                  className="fs-6 fw-normal"
                >
                  -0$
                </small>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
                className="pb-3"
              >
                <small className="text-muted fs-6 fw-normal">
                  Delevery charges
                </small>
                <small
                  style={{ color: colors.success }}
                  className="fs-6 fw-normal"
                >
                  Free
                </small>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "center",
                  width: "100%",
                  borderTop: `1px solid ${colors.greyFade}`,
                }}
                className="py-3"
              >
                <small className="text-muted fs-6 fw-semibold">Total</small>
                <small
                  style={{ color: colors.primary2 }}
                  className="fs-6 fw-semibold"
                >
                  {totalPrice}$
                </small>
              </div>
              {isLoading ? (
                <OrderButton>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                </OrderButton>
              ) : (
                <OrderButton onClick={handleCheckout}>Place order</OrderButton>
              )}
            </div>
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

export async function getServerSideProps(context) {
  const access = context.req.cookies.access ?? false;

  try {
    const response = await fetch(`${API_URL}/cart/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access}`,
      },
    });
    const res = await response.json();

    const cart = res.results ?? [];
    return {
      props: {
        cart,
      },
    };
  } catch (error) {
    const cart = [];

    return {
      props: {
        cart,
      },
    };
  }
}

export default Cart;
