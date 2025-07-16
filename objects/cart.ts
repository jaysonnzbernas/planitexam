import { ProductObj } from "./product";

export class CartObj {
  private products: ProductObj[];

  constructor() {
    this.products = [];
  }

  addProduct(product: ProductObj) {
    this.products.push(product);
  }

  getProducts(): ProductObj[] {
    return this.products;
  }

  getSubtotalForProduct(productName: string): number {
    return this.products.filter(p => p.getName() === productName)
                .map(p => p.getPrice())
                .reduce((total, price) => total + price, 0);
  }

  getTotalPrice(): number {
    return this.products.reduce((total, product) => total + product.getPrice(), 0);
  }

  clearCart() {
    this.products = [];
  }
}