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
import { Heart, ShoppingCart, Star, X } from "react-feather";
import { useRouter } from "next/router";
import Image from "next/image";
import colors from "../../constants/colors";

function ProductCard({
  product,
  addWishlist,
  viewInCart,
  isInWishList,
  remouveTag,
}) {
  const router = useRouter();

  return (
    <CardWrapper id={product.id}>
      <CardImage
        onClick={() => {
          router.push({
            pathname: `products/${encodeURIComponent(product.slug)}`,
            query: { isInWishList },
          });
        }}
      >
        <Image
          src={product.product_image[0].image}
          width={1250}
          height={1200}
          quality={100}
        />
      </CardImage>
      <CardPriceWrapper
        onClick={() => {
          router.push({
            pathname: `products/${encodeURIComponent(product.slug)}`,
            query: { isInWishList },
          });
        }}
      >
        <RatingText>
          <Star
            size={22}
            color={colors.warning}
            fill={colors.warning}
            style={{ marginTop: -5 }}
          />{" "}
          {product.rating}
        </RatingText>
        <PriceText>{product.regular_price} $</PriceText>
      </CardPriceWrapper>
      <CardTitleWrapper
        onClick={() => {
          router.push({
            pathname: `products/${encodeURIComponent(product.slug)}`,
            query: { isInWishList },
          });
        }}
      >
        <RatingText>{product.title}</RatingText>
      </CardTitleWrapper>
      <CardStatWrapper>
        {!remouveTag ? (
          <CardWishlistButton onClick={addWishlist}>
            <Heart
              size={18}
              color={isInWishList ? colors.danger : colors.greyDark}
              fill={isInWishList ? colors.danger : "transparent"}
              style={{ marginRight: 10 }}
            />
            <LinkText> WishList</LinkText>
          </CardWishlistButton>
        ) : (
          <CardWishlistButton onClick={addWishlist}>
            <X size={18} color={colors.greyDark} style={{ marginRight: 10 }} />
            <LinkText>Remove</LinkText>
          </CardWishlistButton>
        )}
        <CardCartButton onClick={viewInCart}>
          <ShoppingCart size={18} style={{ marginRight: 10 }} />
          <LinkText> View in cart</LinkText>
        </CardCartButton>
      </CardStatWrapper>
    </CardWrapper>
  );
}

export default ProductCard;
