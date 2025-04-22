// TODO: fsd layer에 맞춰 이동
import { Product } from "./refactoring/entities/product/model/product";

export interface CartItem {
  product: Product;
  quantity: number;
}
