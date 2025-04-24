import { DISCOUNT_TYPE, Coupon } from "@/refactoring/entities/coupon";
import { Product } from "@/refactoring/entities/product";

export interface CartItem {
  product: Product;
  quantity: number;
}
const isApplicableDiscount = (
  quantity: CartItem["quantity"],
  discount: CartItem["product"]["discounts"][0]
) => {
  return quantity >= discount.quantity;
};
const getBiggerDiscountRate = (
  curMaxDiscountRate: number,
  discount: CartItem["product"]["discounts"][0]
) => {
  return discount.rate > curMaxDiscountRate
    ? discount.rate
    : curMaxDiscountRate;
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const { product, quantity } = item;
  const { discounts } = product;

  // TODO: curry 적용하기
  const applicableDiscounts = discounts.filter((discount) =>
    isApplicableDiscount(quantity, discount)
  );

  // TODO: applicableDiscounts, maxDiscountRate pipe 적용하기
  const maxDiscountRate = applicableDiscounts.reduce(getBiggerDiscountRate, 0);

  return maxDiscountRate;
};

export const calculateItemTotal = (item: CartItem) => {
  const discountRate = getMaxApplicableDiscount(item);
  const {
    product: { price },
    quantity,
  } = item;

  const itemTotal = price * quantity * (1 - discountRate);

  return itemTotal;
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  const totalBeforeDiscount = cart.reduce((total, item) => {
    return total + item.quantity * item.product.price;
  }, 0);

  const totalAfterQuantityDiscount = cart.reduce(
    (total, item) => total + calculateItemTotal(item),
    0
  );

  // 쿠폰을 선택하지 않은 경우
  if (!selectedCoupon) {
    const totalAfterDiscount = totalAfterQuantityDiscount;
    const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

    return {
      totalBeforeDiscount,
      totalAfterDiscount,
      totalDiscount,
    };
  }

  // 금액 할인 쿠폰을 선택한 경우
  if (selectedCoupon.discountType === DISCOUNT_TYPE.amount) {
    const totalAfterDiscount =
      totalAfterQuantityDiscount - selectedCoupon.discountValue;
    const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

    return {
      totalBeforeDiscount,
      totalAfterDiscount,
      totalDiscount,
    };
  }

  // 퍼센트 할인 쿠폰을 선택한 경우
  // TOOD: 반올림, 올림, 버림 중에 정확히 어떤 방식으로 적용해야하는지 확인 필요
  const totalAfterDiscount = Math.round(
    totalAfterQuantityDiscount * (1 - selectedCoupon.discountValue / 100)
  );
  const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
  };
};

export const createCartItem = (cart: CartItem[], product: Product) => {
  const newCartItem: CartItem = { product, quantity: 1 };
  const newCart = [...cart, newCartItem];

  return newCart;
};

export const removeCartItem = (cart: CartItem[], productId: Product["id"]) => {
  const newCart = cart.filter((item) => item.product.id !== productId);

  return newCart;
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  // 수량이 0이하인 경우 장바구니에서 상품 제거
  if (newQuantity <= 0) {
    return removeCartItem(cart, productId);
  }

  const updatedCart = cart.map((item) => {
    if (item.product.id !== productId) {
      return item;
    }

    // 수량이 재고 한도를 초과한 경우 재고 한도만큼으로 수량 조정
    if (newQuantity > item.product.stock) {
      return {
        ...item,
        quantity: item.product.stock,
      };
    }

    // 수량이 재고 한도를 초과하지 않는 경우 수량 업데이트
    return {
      ...item,
      quantity: newQuantity,
    };
  });

  return updatedCart;
};

export const findCartItemByProductId = (
  cart: CartItem[],
  productId: Product["id"]
) => {
  return cart.find((item) => item.product.id === productId);
};

export const getAppliedDiscount = (item: CartItem) => {
  const { discounts } = item.product;
  const { quantity } = item;
  let appliedDiscount = 0;
  for (const discount of discounts) {
    if (quantity >= discount.quantity) {
      appliedDiscount = Math.max(appliedDiscount, discount.rate);
    }
  }
  return appliedDiscount;
};
