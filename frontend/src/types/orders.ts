export type OrderItem = {
  id: string
  quantity: number
  priceAtPurchase: number
  product: {
    id: string
    name: string
  }
}

export type Order = {
  id: string
  total: number
  status: "PENDING" | "PAID" | "CANCELED"
  createdAt: string
  items: OrderItem[]
}