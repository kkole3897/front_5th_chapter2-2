import { useState } from "react";

import {
  Product,
  updateProduct as updateProductModel,
  CreateProductProperties,
  createProduct,
} from "@/refactoring/entities/product";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

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
