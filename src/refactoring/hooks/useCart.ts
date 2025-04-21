// useCart.ts
import { useState } from "react";
import { CartItem, Coupon, Product } from "../../types";
import {
  calculateCartTotal,
  updateCartItemQuantity,
  createCartItem,
  removeCartItem,
  findCartItemByProductId,
} from "../models/cart";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) => {
    if (product.stock <= 0) {
      // TODO: 재고 부족할 때 addToCart하는 경우 커스텀 에러 정의
      throw new Error("재고가 부족합니다.");
    }

    const foundCartItem = findCartItemByProductId(cart, product.id);

    if (foundCartItem) {
      setCart((oldCart) =>
        updateCartItemQuantity(oldCart, product.id, foundCartItem.quantity + 1)
      );
      return;
    }

    setCart((oldCart) => createCartItem(oldCart, product));
  };

  const removeFromCart = (productId: string) => {
    setCart((oldCart) => removeCartItem(oldCart, productId));
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
