// TODO: fsd layer에 맞춰 이동
import { type DiscountType as CouponDiscountType } from "./refactoring/entities/coupon";

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  discounts: Discount[];
}

export interface Discount {
  quantity: number;
  rate: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Coupon {
  name: string;
  code: string;
  discountType: CouponDiscountType;
  discountValue: number;
}
