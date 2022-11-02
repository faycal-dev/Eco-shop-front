import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { API_URL } from "../../config";
import Layout from "../../hocs/Layout";
import colors from "../../constants/colors";
import ProductCard from "../../components/product/ProductCard";

import SweetAlert from "react-bootstrap-sweetalert";

function Wishlist({ products }) {
  const router = useRouter();
  const [wishlist, setWishlist] = useState(products);
  const [alert, setAlert] = useState({
    title: "",
    body: "",
    show: false,
    success: false,
  });

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  const handleRemoveWishlist = async (id) => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    } else {
      try {
        const body = JSON.stringify({ id: id });
        const res = await fetch("api/shop/toggle_product_to_wishlist", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: body,
        });
        const data = await res.json();
        const temporaryWishlist = [...wishlist];
        const indexOfElement = temporaryWishlist.findIndex((object) => {
          return object.id === id;
        });
        temporaryWishlist.splice(indexOfElement, 1);
        setWishlist(temporaryWishlist);

        setAlert({
          title: "Success",
          body: data.success,
          show: true,
          success: true,
        });
      } catch (error) {
        setAlert({
          title: "Failed to remouve item from wishlist",
          body: error,
          show: true,
          success: false,
        });
      }
    }
  };

  if (typeof window !== "undefined" && !loading && !isAuthenticated) {
    router.push("/auth/login");
  }

  return (
    <Layout title="Wish list" content="List of all the products you liked">
      <Row className="mx-3 my-3">
        <h6
          style={{
            color: colors.dark,
            fontSize: "1rem",
            fontWeight: 400,
          }}
        >
          You liked {wishlist.length} product
        </h6>
        <Row className="mx-3  w-100">
          {wishlist.map((product) => (
            <Col xs="12" sm="6" md="4" lg="3" xl="3" className="my-3">
              <ProductCard
                product={product}
                addWishlist={() => handleRemoveWishlist(product.id)}
                viewInCart={() => {}}
                isInWishList={true}
                remouveTag={true}
              />
            </Col>
          ))}
        </Row>
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
    </Layout>
  );
}

export default Wishlist;

export async function getServerSideProps(context) {
  const access = context.req.cookies.access;
  try {
    const response = await fetch(`${API_URL}/api/wishlist`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access}`,
      },
    });
    const products = await response.json();

    if (products?.code) {
      return {
        props: {
          products: [],
        },
      };
    }
    return {
      props: {
        products,
      },
    };
  } catch (error) {
    const products = [];

    return {
      props: {
        products,
      },
    };
  }
}
