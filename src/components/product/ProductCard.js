import React from "react";
import {
  CardWrapper,
  CardImage,
  CardPriceWrapper,
  PriceText,
  RatingText,
  CardTitleWrapper,
  CardWishlistButton,
  CardCartButton,
  CardStatWrapper,
  LinkText,
} from "./productCardElements";
import { Heart, ShoppingCart } from "react-feather";
import Image from "next/image";

function ProductCard({ product }) {
  return (
    <CardWrapper id={product.id}>
      <CardImage>
        <Image
          src={product.product_image[0].image}
          width={1250}
          height={1200}
          quality={100}
        />
      </CardImage>
      <CardPriceWrapper>
        <RatingText>⭐️ {product.rating}</RatingText>
        <PriceText>{product.regular_price} $</PriceText>
      </CardPriceWrapper>
      <CardTitleWrapper>
        <RatingText>{product.title}</RatingText>
      </CardTitleWrapper>
      <CardStatWrapper>
        <CardWishlistButton>
          <Heart size={18} style={{ marginRight: 5 }} />
          <LinkText>{" "}WishList</LinkText>
        </CardWishlistButton>
        <CardCartButton>
          <ShoppingCart size={18} style={{ marginRight: 5 }} />
          <LinkText>{" "}View in cart</LinkText>
        </CardCartButton>
      </CardStatWrapper>
    </CardWrapper>
  );
}

export default ProductCard;
