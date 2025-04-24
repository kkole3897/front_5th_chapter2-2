import { useState } from "react";

import {
  CreateProductForm,
  EditProductCollapsible,
} from "@/refactoring/features/product";
import { CreateCouponForm } from "@/refactoring/features/coupon";
import {
  Product,
  CreateProductProperties,
} from "@/refactoring/entities/product";
import { Coupon, CouponDisplay } from "@/refactoring/entities/coupon";

interface Props {
  products: Product[];
  coupons: Coupon[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: CreateProductProperties) => void;
  onCouponAdd: (newCoupon: Coupon) => void;
}

const AdminPage = ({
  products,
  coupons,
  onProductUpdate,
  onProductAdd,
  onCouponAdd,
}: Props) => {
  const [showNewProductForm, setShowNewProductForm] = useState(false);

  const handleCreateProduct = (product: CreateProductProperties) => {
    onProductAdd(product);
    setShowNewProductForm(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
          <button
            onClick={() => setShowNewProductForm(!showNewProductForm)}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
          >
            {showNewProductForm ? "취소" : "새 상품 추가"}
          </button>
          {showNewProductForm && (
            <CreateProductForm onCreate={handleCreateProduct} />
          )}
          <div className="space-y-2">
            {products.map((product, index) => (
              <EditProductCollapsible
                key={product.id}
                index={index}
                product={product}
                onChange={onProductUpdate}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
          <div className="bg-white p-4 rounded shadow">
            <CreateCouponForm onCreate={onCouponAdd} />
            <div>
              <h3 className="text-lg font-semibold mb-2">현재 쿠폰 목록</h3>
              <div className="space-y-2">
                {coupons.map((coupon, index) => (
                  <CouponDisplay key={index} coupon={coupon} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
