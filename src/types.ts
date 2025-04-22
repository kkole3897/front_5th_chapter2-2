// TODO: fsd layer에 맞춰 이동
import { type DiscountType as CouponDiscountType } from "./refactoring/entities/coupon";
import { Product } from "./refactoring/entities/product/model/product";

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
