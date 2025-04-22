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
type RequiredCreateProductProperty =
  (typeof REQUIRED_CREATE_PRODUCT_PROPERTIES)[number];

export type CreateProductInput = Partial<
  Pick<Product, RequiredCreateProductProperty>
>;

export const createProduct = (
  products: Product[],
  newProductInput: CreateProductInput
) => {
  if (!validateMissingRequiredProperties(newProductInput)) {
    throw new MissingRequiredProductPropertyError(newProductInput);
  }

  if (!validateProductName(newProductInput.name)) {
    throw new InvalidProductNameError(newProductInput.name);
  }

  if (!validateDuplicatedProductName(products, newProductInput.name)) {
    throw new DuplicatedProductNameError(newProductInput.name);
  }

  const newProduct = {
    id: generateProductId(),
    discounts: [],
    ...newProductInput,
  };

  return [...products, newProduct];
};

function validateMissingRequiredProperties(
  newProductInput: CreateProductInput
): newProductInput is Required<CreateProductInput> {
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

let id = 0;
function generateProductId(): string {
  id += 1;

  return `p${id}`;
}
