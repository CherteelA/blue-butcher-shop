interface ForCustomer {
  id: string
  name: string
  description: string
  price: number
  article: string
  quantity: number //кол-во на складе
  active: boolean
  createdAt: string
  idVendor: string
  rating: number
  countGrades: number
  quantitySold: number
  countComments: number
}

interface miniPhoto {
  id: string
  url: string
  product_id: string
}
