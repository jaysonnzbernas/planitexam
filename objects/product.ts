export class ProductObj {
  private name: string;
  private price: number;
  private img: string;

  constructor(name: string, price: number, img: string) {
    this.name = name;
    this.price = price;
    this.img = img;
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  getImg(): string {
    return this.img;
  }
}