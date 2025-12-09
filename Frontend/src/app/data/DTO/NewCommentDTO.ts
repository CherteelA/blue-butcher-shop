export class NewCommentDTO {

  comment: string;

  userId: string;

  productId: string;

  username: string;

  constructor(comment: string, userId: string, productId: string, username: string) {
    this.comment = comment;
    this.userId = userId;
    this.productId = productId;
    this.username = username;
  }

}
