// useCart.ts
import { useState } from "react";
import { CartItem, Coupon, Product } from "../../types";
import { calculateCartTotal, updateCartItemQuantity } from "../models/cart";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) => {
    if (product.stock <= 0) {
      // TODO: 재고 부족할 때 addToCart하는 경우 커스텀 에러 정의
      throw new Error("재고가 부족합니다.");
    }

    // TODO: model로 분리해서 추상화 level 맞추기
    const matchedCartItem = cart.find((item) => item.product.id === product.id);

    if (matchedCartItem) {
      setCart((oldCart) =>
        updateCartItemQuantity(
          oldCart,
          product.id,
          matchedCartItem.quantity + 1
        )
      );
      return;
    }

    // TODO: model로 분리해서 추상화 level 맞추기
    setCart((oldCart) => [...oldCart, { product, quantity: 1 }]);
  };

  const removeFromCart = (productId: string) => {
    setCart((oldCart) => updateCartItemQuantity(oldCart, productId, 0));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((oldCart) =>
      updateCartItemQuantity(oldCart, productId, newQuantity)
    );
  };

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  const calculateTotal = () => calculateCartTotal(cart, selectedCoupon);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  };
};
