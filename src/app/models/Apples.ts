export class Apples {
  url: string;
  numberOfApples: number;
  price: number;
  unitPrice: number;

  constructor(url, numberOfApples, price) {
    this.url = url;
    this.numberOfApples = numberOfApples;
    this.price = price;
    this.unitPrice = this.price / this.numberOfApples;
  }
}
