import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag } from "react-feather";

import { runFireWorks } from "../../components/confetti/fireWorks";
import colors from "../../constants/colors";

const Success = () => {
  const validateChekout = async () => {
    try {
      const res = await fetch("/api/shop/validate_chekout", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    runFireWorks();
    validateChekout();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
      className="container"
    >
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px",
          backgroundColor: colors.greyFade2,
        }}
      >
        <p className="icon">
          <ShoppingBag color={colors.primary2} />
        </p>
        <h2 style={{ color: colors.dark }}>Thank you for your order!</h2>
        <p className="text-muted">Check your email inbox for the receipt.</p>
        <p className="text-muted">
          If you have any questions, please email{" "}
          <a
            style={{ color: colors.primary2, textDecoration: "none" }}
            href="mailto:ecoshop31@gmail.com"
          >
            ecoshop31@gmail.com
          </a>
        </p>
        <Link href="/products">
          <div
            className="px-3 py-2 my-3"
            style={{
              color: colors.white,
              backgroundColor: colors.primary2,
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Continue Shopping
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Success;
