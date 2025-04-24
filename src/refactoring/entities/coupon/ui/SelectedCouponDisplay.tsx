import { Coupon } from "../model";

interface SelectedCouponDisplayProps {
  coupon: Coupon;
}
const SelectedCouponDisplay = ({ coupon }: SelectedCouponDisplayProps) => {
  return (
    <p className="text-green-600">
      적용된 쿠폰: {coupon.name}(
      {coupon.discountType === "amount"
        ? `${coupon.discountValue}원`
        : `${coupon.discountValue}%`}{" "}
      할인)
    </p>
  );
};
export default SelectedCouponDisplay;
