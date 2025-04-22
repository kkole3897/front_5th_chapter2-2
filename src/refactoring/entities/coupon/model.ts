import type { DiscountType as CouponDiscountType } from "./constants";

export interface Coupon {
  name: string;
  code: string;
  discountType: CouponDiscountType;
  discountValue: number;
}
