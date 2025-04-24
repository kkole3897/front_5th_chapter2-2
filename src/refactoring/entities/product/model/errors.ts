import {
  CreateProductProperties,
  Product,
  REQUIRED_CREATE_PRODUCT_PROPERTIES,
} from "./product";

export class MissingRequiredProductPropertyError extends Error {
  static readonly NAME = "MissingRequiredProductPropertyError";

  constructor(
    public readonly createProductProperties: CreateProductProperties
  ) {
    const givenProperties = Object.keys(createProductProperties);
    const missingProperties = REQUIRED_CREATE_PRODUCT_PROPERTIES.filter(
      (property) => !givenProperties.includes(property)
    );

    const message = `A product must have the following properties: ${missingProperties.join(
      ", "
    )}`;
    super(message);
    this.name = MissingRequiredProductPropertyError.NAME;
  }
}

export class InvalidProductNameError extends Error {
  static readonly NAME = "InvalidProductNameError";

  constructor(public readonly productName: string) {
    const message = `The product name "${productName}" is invalid.`;
    super(message);
    this.name = InvalidProductNameError.NAME;
  }
}

export class DuplicatedProductNameError extends Error {
  static readonly NAME = "DuplicatedProductNameError";

  constructor(public readonly productName: string) {
    const message = `The product name "${productName}" is already in use.`;
    super(message);
    this.name = DuplicatedProductNameError.NAME;
  }
}
export class OutOfStockError extends Error {
  static readonly name = "OutOfStockError";

  constructor(product: Product) {
    super(`${product.name} is out of stock`);
    this.name = OutOfStockError.name;
  }
}
