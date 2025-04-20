export const DISCOUNT_TYPE = {
  amount: "amount",
  percentage: "percentage",
} as const;

export type DiscountType = (typeof DISCOUNT_TYPE)[keyof typeof DISCOUNT_TYPE];
