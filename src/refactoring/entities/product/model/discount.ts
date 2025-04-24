export interface Discount {
  quantity: number;
  rate: number;
}

export const getMaxDiscount = (discounts: Discount[]) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

export const createDiscount = (
  discounts: Discount[],
  newDiscount: Discount
) => {
  return [...discounts, newDiscount];
};

export const deleteDiscount = (discounts: Discount[], index: number) => {
  return discounts.filter((_, i) => i !== index);
};
