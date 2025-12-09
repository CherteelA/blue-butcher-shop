export class Product_New{

  name: string;

  description: string;

  price: number;

  article: string;

  quantity: number;

  active: boolean;

  idVendor: string;

  message: string = "";


  constructor(name: string, description: string, price: number, article: string, quantity: number, active: boolean, idVendor: string) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.article = article;
    this.quantity = quantity;
    this.active = active;
    this.idVendor = idVendor;
  }

}

export class Photo{
  url: string;

  constructor(url: string) {
    this.url = url;
  }
}

export class Avatar{
  url: string;
  constructor(url: string) {
    this.url = url;
  }
}

export class NewProductDTO{
  product: Product_New

  photos: Photo[]

  avatar: Avatar


  constructor(product: Product_New, photos: Photo[], avatar: Avatar) {
    this.product = product;
    this.photos = photos;
    this.avatar = avatar;
  }
}
