import { useState } from "react";
import { Product } from "../../types.ts";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const updateProduct = (updatedProduct: Product) => {
    const newProducts = products.map((product) => {
      if (product.id === updatedProduct.id) {
        return updatedProduct;
      }

      return product;
    });

    setProducts(newProducts);
  };

  const addProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  };

  return {
    products,
    updateProduct,
    addProduct,
  };
};
