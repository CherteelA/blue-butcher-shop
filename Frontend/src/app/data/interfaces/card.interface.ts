interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  article: string;
  rating: number;
  quantitySold: number;
  url: string;
  countComments: number;
}

interface ProductSearchList {
  productForSearchList: Product[];
}

interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

interface Links {
  self: {
    href: string;
  };
}

interface ApiResponse {
  _embedded: ProductSearchList;
  _links: Links;
  page: Page;
}



interface CommentData {
   id: string;
   comment: string;
   userId: string;
   createdAt: string;
   productId: string;
   countLikes: number;
   username: string;
}
