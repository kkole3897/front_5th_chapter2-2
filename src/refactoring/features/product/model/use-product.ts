import {
  Product,
  updateProduct as updateProductModel,
  CreateProductProperties,
  createProduct,
} from "@/refactoring/entities/product";
import { useLocalStorage } from "@/refactoring/shared/lib/hooks";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useLocalStorage<Product[]>(
    "products",
    initialProducts
  );

  const updateProduct = (updatedProduct: Product) => {
    setProducts((oldProducts) =>
      updateProductModel(oldProducts, updatedProduct)
    );
  };

  const addProduct = (newProduct: CreateProductProperties) => {
    setProducts((oldProducts) => createProduct(oldProducts, newProduct));
  };

  return {
    products,
    updateProduct,
    addProduct,
  };
};
