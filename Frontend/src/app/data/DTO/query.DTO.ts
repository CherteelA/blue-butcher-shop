export class QueryDTO {
  query: string
  page: number
  size: number

  constructor(query: string,  size: number, page: number) {
    this.query = query
    this.page = page
    this.size = size
  }
}
