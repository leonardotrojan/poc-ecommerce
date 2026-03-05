import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) {}

    async createOrder(userId: string) {

        return this.prisma.$transaction(async (prisma) => {
            const cart = await prisma.cart.findUnique({
            where: {
                userId,
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        })

        if (!cart || cart.items.length === 0) {
            throw new Error("Carrinho vazio")
        }

        const total = cart.items.reduce((acc, item) => {
            return acc + Number(item.product.price) * item.quantity 
        }, 0)

        const order = await prisma.order.create({
            data: {
                userId,
                total,
                status: "PAID",
                items: {
                    create: cart.items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        priceAtPurchase: item.product.price
                    }))
                }
            },
            include: {
                items: true
            }
        })

        await prisma.orderItem.createMany({
            data: cart.items.map(item => ({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                priceAtPurchase: item.product.price
            }))
        })

        await prisma.cartItem.deleteMany({
            where: {
                cartId: cart.id
            }
        })

        return order
        })
    }

    async getOrders(userId: string) {
        const orders = this.prisma.order.findMany({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return orders
    }
}
