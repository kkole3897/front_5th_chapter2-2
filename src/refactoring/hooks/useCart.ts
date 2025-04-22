// useCart.ts
import { useState } from "react";
import { CartItem, Coupon } from "../../types";
import { Product } from "../entities/product/model/product";
import {
  calculateCartTotal,
  updateCartItemQuantity,
  createCartItem,
  removeCartItem,
  findCartItemByProductId,
} from "../models/cart";
import { OutOfStockError } from "../models/product";
export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) => {
    if (product.stock <= 0) {
      throw new OutOfStockError(product);
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
