import { Product } from "../entities/product/model/product";

export class OutOfStockError extends Error {
  static readonly name = "OutOfStockError";

  constructor(product: Product) {
    super(`${product.name} is out of stock`);
    this.name = OutOfStockError.name;
  }
}
