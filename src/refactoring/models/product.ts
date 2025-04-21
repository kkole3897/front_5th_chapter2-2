import { Product } from "../../types";

export class OutOfStockError extends Error {
  static readonly name = "OutOfStockError";

  constructor(product: Product) {
    super(`${product.name} is out of stock`);
    this.name = OutOfStockError.name;
  }
}
