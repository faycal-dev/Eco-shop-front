import Image from "next/image";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Truck } from "react-feather";
import { API_URL } from "../../config";
import colors from "../../constants/colors";
import Layout from "../../hocs/Layout";

function Orders({ orders }) {
  return (
    <Layout title="Orders" content="List of all the orders you made and pay">
      {(!orders || orders?.length === 0) && (
        <Container
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            backgroundColor: colors.white,
            borderRadius: 10,
            boxShadow: `5px 5px 5px ${colors.greyFade}`,
          }}
        >
          <h2 className="text-muted">You do not have any order</h2>
        </Container>
      )}
      {orders?.map((order) => (
        <Container
          key={order.id}
          className="mt-4"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "2rem",
            backgroundColor: colors.white,
            borderRadius: 10,
            boxShadow: `5px 5px 5px ${colors.greyFade}`,
          }}
        >
          <p className="fs-4 fw-semibold">Total price: {order.total_price}$</p>
          <div
            className="pt-2 pb-4 mb-3"
            style={{
              display: "flex",
              flexDirection: "row",
              borderBottom: `1px solid ${colors.greyFade}`,
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                paddingRight: "1rem",
                borderRight: `1px solid ${colors.greyFade}`,
              }}
            >
              <small className="text-muted fs-6 fw-semibold">Order date:</small>
              <small
                className="fs-6 fw-semibold"
                style={{ color: colors.dark, marginLeft: 10 }}
              >
                {new Date(order.updated).toDateString()}
              </small>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "1rem",
              }}
            >
              <Truck
                style={{ marginTop: 3 }}
                size={20}
                color={colors.success}
              />
              <small
                style={{ color: colors.success, marginLeft: "10px" }}
                className="fs-6 fw-semibold"
              >
                delivry date:{" "}
                {new Date(
                  parseInt(
                    new Date(order.updated).setDate(
                      new Date(order.updated).getDate() + 3
                    )
                  )
                ).toDateString()}
              </small>
            </div>
          </div>
          {order.items?.map((item) => (
            <Row key={item.id} className="mb-2" style={{ width: "100%" }}>
              <Col xs="12" md="3" lg="2">
                <div
                  style={{
                    backgroundColor: colors.greyFade2,
                    borderRadius: 5,
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                  }}
                >
                  <Image
                    src={item.product.product_image[0].image}
                    width={80}
                    height={80}
                    quality={100}
                  />
                </div>
              </Col>
              <Col xs="12" md="7" lg="8">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-evenly",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <p
                    style={{ color: colors.primary2 }}
                    className="fs-6 fw-semibold"
                  >
                    {item.product.title}
                  </p>
                  <small className="fs-6 fw-semibold text-muted">
                    {item.product.brand}
                  </small>
                  <small
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                    }}
                    className="fs-7 fw-normal text-muted"
                  >
                    {item.product.description}
                  </small>
                </div>
              </Col>
              <Col xs="12" md="2" lg="2">
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <p
                    style={{ color: colors.primary2 }}
                    className="fs-5 fw-semibold"
                  >
                    {item.price}$
                  </p>
                  <small className="fs-7 fw-normal text-muted">
                    {" "}
                    Qty: {item.quantity}
                  </small>
                </div>
              </Col>
            </Row>
          ))}
        </Container>
      ))}
    </Layout>
  );
}

export default Orders;

export async function getServerSideProps(context) {
  const access = context.req.cookies.access ?? false;

  try {
    const response = await fetch(`${API_URL}/cart/get_orders`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access}`,
      },
    });
    const res = await response.json();

    const orders = res.results ?? [];
    return {
      props: {
        orders,
      },
    };
  } catch (error) {
    const orders = [];

    return {
      props: {
        orders,
      },
    };
  }
}
