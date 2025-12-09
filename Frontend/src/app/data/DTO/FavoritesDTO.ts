export class Favorite {
  id: string;

  productId: string;

  userID: string;

  constructor(id: string, productId: string, userID: string) {
    this.id = id;
    this.productId = productId;
    this.userID = userID;
  }
}
