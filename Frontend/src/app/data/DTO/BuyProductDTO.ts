import {Favorite} from './FavoritesDTO';

export class BuyProductDTO extends Favorite{

  private buyAt: string;

  private price: number;

  constructor(id: string, productId: string, userID: string, buyAt: string, price: number) {
    super(id, productId, userID)
    this.buyAt = buyAt;
    this.price = price;
  }
}
