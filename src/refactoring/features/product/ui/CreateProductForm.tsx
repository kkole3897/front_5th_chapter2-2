import { CreateProductProperties } from "@/refactoring/entities/product";
import { useState } from "react";

interface CreateProductFormProps {
  onCreate?: (product: CreateProductProperties) => void;
}
const CreateProductForm = ({ onCreate }: CreateProductFormProps) => {
  const [newProductFormState, setNewProductFormState] = useState<
    Required<CreateProductProperties>
  >({
    name: "",
    price: 0,
    stock: 0,
  });

  const handleChangeNewProductField = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    const transformValueMap = {
      name: (value: string) => value,
      price: (value: string) => parseInt(value),
      stock: (value: string) => parseInt(value),
    };

    setNewProductFormState({
      ...newProductFormState,
      [name]: transformValueMap[name as keyof CreateProductProperties](value),
    });
  };

  const handleClickCreateButton = () => {
    onCreate?.(newProductFormState);
    setNewProductFormState({
      name: "",
      price: 0,
      stock: 0,
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
      <div className="mb-2">
        <label
          htmlFor="productName"
          className="block text-sm font-medium text-gray-700"
        >
          상품명
        </label>
        <input
          id="productName"
          type="text"
          name="name"
          value={newProductFormState.name}
          onChange={handleChangeNewProductField}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="productPrice"
          className="block text-sm font-medium text-gray-700"
        >
          가격
        </label>
        <input
          id="productPrice"
          type="number"
          name="price"
          value={newProductFormState.price}
          onChange={handleChangeNewProductField}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="productStock"
          className="block text-sm font-medium text-gray-700"
        >
          재고
        </label>
        <input
          id="productStock"
          type="number"
          name="stock"
          value={newProductFormState.stock}
          onChange={handleChangeNewProductField}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={handleClickCreateButton}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        추가
      </button>
    </div>
  );
};
export default CreateProductForm;
