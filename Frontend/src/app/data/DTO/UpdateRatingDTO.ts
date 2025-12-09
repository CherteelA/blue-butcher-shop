export class RatingDTO {

  id: string = "";

  productId: string = "";

  userId: string = "";

  grade: number;

  constructor(productId: string, userId: string, grade: number) {
    this.productId = productId;
    this.userId = userId;
    this.grade = grade;
  }
}
