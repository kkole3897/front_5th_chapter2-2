import { useState } from "react";
import { CartItem } from "@/refactoring/features/cart";
import { Coupon } from "@/refactoring/entities/coupon";
import { Product, ProductInfoCard } from "@/refactoring/entities/product";
import {
  AddToCartButton,
  ManageCartItemCard,
  CartSummaryDisplay,
} from "@/refactoring/features/cart";
import { CouponSelect } from "@/refactoring/features/coupon";
import { SelectedCouponDisplay } from "@/refactoring/entities/coupon";

interface Props {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const handleClickAddToCartButton = (product: Product) => {
    const remainingStock = getRemainingStock(product);
    if (remainingStock <= 0) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId)
    );
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const maxQuantity = item.product.stock;
            const updatedQuantity = Math.max(
              0,
              Math.min(newQuantity, maxQuantity)
            );
            return updatedQuantity > 0
              ? { ...item, quantity: updatedQuantity }
              : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const getRemainingStock = (product: Product) => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    return product.stock - (cartItem?.quantity || 0);
  };

  const handleChangeSelectedCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
          <div className="space-y-2">
            {products.map((product) => {
              const remainingStock = getRemainingStock(product);
              return (
                <ProductInfoCard
                  key={product.id}
                  product={product}
                  remainingStock={remainingStock}
                  footer={
                    <AddToCartButton
                      remainingStock={remainingStock}
                      onClick={() => handleClickAddToCartButton(product)}
                    />
                  }
                />
              );
            })}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>

          <div className="space-y-2">
            {cart.map((item) => {
              return (
                <ManageCartItemCard
                  key={item.product.id}
                  item={item}
                  onChangeQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveFromCart}
                />
              );
            })}
          </div>

          <div className="mt-6 bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">쿠폰 적용</h2>
            {
              <CouponSelect
                coupons={coupons}
                onChange={handleChangeSelectedCoupon}
              />
            }
            {selectedCoupon && (
              <SelectedCouponDisplay coupon={selectedCoupon} />
            )}
          </div>

          {<CartSummaryDisplay cart={cart} selectedCoupon={selectedCoupon} />}
        </div>
      </div>
    </div>
  );
};
