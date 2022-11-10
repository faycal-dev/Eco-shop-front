import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { API_URL } from "../../config";
import Layout from "../../hocs/Layout";
import { Row, Col, Container, Spinner } from "react-bootstrap";
import colors from "../../constants/colors";
import { Star, Heart, ShoppingCart, Award, Clock, Shield } from "react-feather";
import styled from "styled-components";
import SweetAlert from "react-bootstrap-sweetalert";

const ImageContainer = styled.div`
  width: 110px;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ isActive }) =>
    isActive ? colors.greyFade2 : "transparent"};
  /* border: ${({ isActive }) =>
    isActive ? `2px solid ${colors.primary2}` : "none"}; */
`;

const CartButton = styled.div`
  margin-right: 1rem;
  padding-left: 20px;
  padding-right: 20px;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${colors.primary2};
  color: ${colors.white};

  &:hover {
    transition: 0.1s all ease-in-out;
    transform: scale(1.05);
  }
`;

const WishlistButton = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${colors.white};
  color: ${colors.greyDark};
  border: 1px solid ${colors.greyDark};

  &:hover {
    transition: 0.1s all ease-in-out;
    transform: scale(1.05);
    background-color: ${colors.greyFade2};
  }
`;

function Product({ product, isInWishList }) {
  const [selectedImage, setSelectedImage] = useState(
    product.product_image[0].image
  );
  const [IsInWishList, setIsInWishList] = useState(isInWishList);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [isWishListLoading, setIsWishlistLoading] = useState(false);
  const [alert, setAlert] = useState({
    title: "",
    body: "",
    show: false,
    success: false,
  });

  const router = useRouter();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const toggleWishlist = async () => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    } else {
      try {
        setIsWishlistLoading(true);
        const body = JSON.stringify({ id: product.id });
        const res = await fetch("/api/shop/toggle_product_to_wishlist", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: body,
        });
        const data = await res.json();
        setIsInWishList((prevState) => !prevState);
        setIsWishlistLoading(false);

        setAlert({
          title: "Success",
          body: data.success,
          show: true,
          success: true,
        });
      } catch (error) {
        setIsWishlistLoading(false);

        setAlert({
          title: "Failed to modify the wishlist",
          body: error,
          show: true,
          success: false,
        });
      }
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    } else {
      try {
        setIsCartLoading(true);
        const body = JSON.stringify({ id: product.id });
        const res = await fetch("/api/shop/add_to_cart", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: body,
        });
        const data = await res.json();
        setIsCartLoading(false);

        setAlert({
          title: "Success",
          body: data.success,
          show: true,
          success: true,
        });
      } catch (error) {
        setIsCartLoading(false);

        setAlert({
          title: "Failed to modify the cart",
          body: "",
          show: true,
          success: false,
        });
      }
    }
  };

  return (
    <Layout
      title="Product details"
      content="All the details about a specific product"
    >
      <Container>
        <Row
          className="py-5"
          style={{
            backgroundColor: colors.white,
            width: "100%",
            borderRadius: 5,
            boxShadow: `5px 5px 10px 1px  ${colors.greyFade}`,
            marginTop: "2rem",
            marginBottom: -30,
          }}
        >
          <Col
            md="5"
            sm="12"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image src={selectedImage} width={300} height={300} quality={100} />
          </Col>
          <Col
            md="7"
            sm="12"
            style={{
              flexDirection: "column",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <p
              style={{ fontSize: 22, color: colors.greyDark, fontWeight: 600 }}
            >
              {product.title}
            </p>
            <div className="d-flex mb-3">
              <small className="text-muted">By</small>
              <small
                style={{
                  color: colors.primary2,
                  marginLeft: "5px",
                  fontWeight: 600,
                }}
              >
                {product.brand}
              </small>
              <small
                style={{
                  marginLeft: "60px",
                }}
                className="text-muted "
              >
                Category:{" "}
              </small>
              <small
                style={{
                  color: colors.primary2,
                  marginLeft: "5px",
                  fontWeight: 600,
                }}
              >
                {product.category.name}
              </small>
            </div>
            <div className="d-flex">
              <p
                style={{
                  fontSize: 20,
                  color: colors.primary2,
                  fontWeight: 500,
                  marginRight: "2rem",
                }}
              >
                {product.regular_price} $
              </p>
              <Star
                style={{ marginTop: "5px" }}
                size={20}
                fill={colors.warning}
                color={colors.warning}
              />
              <p
                style={{
                  fontSize: 20,
                  color: colors.greyDark,
                  marginLeft: "0.3rem",
                }}
              >
                ({product.rating})
              </p>
            </div>
            <p className="text-muted">{product.description}</p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                borderTop: `1px solid ${colors.greyFade}`,
                borderBottom: `1px solid ${colors.greyFade}`,
                width: "100%",
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              {product.product_image.map((image) => (
                <ImageContainer
                  key={image.image}
                  isActive={selectedImage == image.image}
                  onMouseEnter={() => {
                    setSelectedImage(image.image);
                  }}
                >
                  <Image
                    src={image.image}
                    width={90}
                    height={90}
                    quality={100}
                  />
                </ImageContainer>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderBottom: `1px solid ${colors.greyFade}`,
                width: "100%",
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              {product.productSpecificationValue.map((spec) => (
                <div key={spec.id} className="d-flex">
                  <small className="text-muted">
                    {spec.specification.name}:
                  </small>
                  <small
                    style={{
                      color: colors.primary2,
                      marginLeft: "10px",
                      fontWeight: 600,
                    }}
                  >
                    {spec.value}
                  </small>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              {isCartLoading ? (
                <CartButton>
                  <Spinner
                    as="span"
                    animation="border"
                    size="lg"
                    role="status"
                    aria-hidden="true"
                  />
                </CartButton>
              ) : (
                <CartButton onClick={handleAddToCart}>
                  <ShoppingCart
                    style={{ marginRight: "10px" }}
                    size={16}
                    color={colors.white}
                  />
                  Move to cart
                </CartButton>
              )}
              {isWishListLoading ? (
                <WishlistButton>
                  <Spinner
                    as="span"
                    animation="border"
                    size="lg"
                    role="status"
                    aria-hidden="true"
                  />
                </WishlistButton>
              ) : (
                <WishlistButton onClick={toggleWishlist}>
                  <Heart
                    style={{ marginRight: "10px" }}
                    size={16}
                    color={IsInWishList ? colors.danger : colors.greyDark}
                    fill={IsInWishList ? colors.danger : "transparent"}
                  />
                  {IsInWishList ? "Remove from Wishlist" : "Add to wishlist"}
                </WishlistButton>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Row className="py-5 mt-5">
              <Col className="text-center" md="4" sm="12">
                <div className="w-50 mx-auto">
                  <Award
                    className="text-primary mb-1"
                    size={42}
                    color={colors.primary2}
                  />
                  <p
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      marginBottom: 10,
                      marginTop: 20,
                      color: colors.greyDark,
                    }}
                  >
                    100% Original
                  </p>
                  <p className="text-muted">
                    All our products are guarenteed to be original.
                  </p>
                </div>
              </Col>
              <Col className="text-center" md="4" sm="12">
                <div className="w-50 mx-auto">
                  <Clock
                    className="text-primary mb-1"
                    size={42}
                    color={colors.primary2}
                  />
                  <p
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      marginBottom: 10,
                      marginTop: 20,
                      color: colors.greyDark,
                    }}
                  >
                    10 Day Replacement
                  </p>
                  <p className="text-muted">
                    You have up to 10 days after your order to return the
                    product.
                  </p>
                </div>
              </Col>
              <Col className="text-center" md="4" sm="12">
                <div className="w-50 mx-auto">
                  <Shield
                    className="text-primary mb-1"
                    size={42}
                    color={colors.primary2}
                  />
                  <p
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      marginBottom: 10,
                      marginTop: 20,
                      color: colors.greyDark,
                    }}
                  >
                    1 Year Warranty
                  </p>
                  <p className="text-muted">
                    We ensure one year of Warranty and safe use.
                  </p>
                </div>
              </Col>
            </Row>
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

export default Product;

export async function getServerSideProps({ params, query }) {
  const isInWishList = query.isInWishList === "true";
  try {
    const res = await fetch(`${API_URL}/api/${params.slug}`);
    const product = await res.json();

    return {
      props: {
        product,
        isInWishList,
      },
    };
  } catch (error) {
    return {
      props: {
        product: [],
      },
    };
  }
}
