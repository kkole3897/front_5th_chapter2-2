import { Discount } from "./discount";
import {
  DuplicatedProductNameError,
  InvalidProductNameError,
  MissingRequiredProductPropertyError,
} from "./errors";

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  discounts: Discount[];
}

export const REQUIRED_CREATE_PRODUCT_PROPERTIES = [
  "name",
  "price",
  "stock",
] as const;
type RequiredCreateProductProperties =
  (typeof REQUIRED_CREATE_PRODUCT_PROPERTIES)[number];

export type CreateProductProperties = Partial<
  Pick<Product, RequiredCreateProductProperties>
>;

export const createProduct = (
  products: Product[],
  newProductProperties: CreateProductProperties
) => {
  if (!validateMissingRequiredProperties(newProductProperties)) {
    throw new MissingRequiredProductPropertyError(newProductProperties);
  }

  if (!validateProductName(newProductProperties.name)) {
    throw new InvalidProductNameError(newProductProperties.name);
  }

  if (!validateDuplicatedProductName(products, newProductProperties.name)) {
    throw new DuplicatedProductNameError(newProductProperties.name);
  }

  const newProduct = {
    id: `p${products.length + 1}`,
    discounts: [],
    ...newProductProperties,
  };

  return [...products, newProduct];
};

function validateMissingRequiredProperties(
  newProductInput: CreateProductProperties
): newProductInput is Required<CreateProductProperties> {
  const { name, price, stock } = newProductInput;

  if (name === undefined || price === undefined || stock === undefined) {
    return false;
  }

  return true;
}

function validateProductName(name: string) {
  return name.length > 0;
}

function validateDuplicatedProductName(
  products: Product[],
  newProductName: string
) {
  const duplicatedProduct = products.find(
    (product) => product.name === newProductName
  );

  if (duplicatedProduct) {
    return false;
  }

  return true;
}

export const updateProduct = (products: Product[], updatedProduct: Product) => {
  return products.map((product) =>
    product.id === updatedProduct.id ? updatedProduct : product
  );
};
