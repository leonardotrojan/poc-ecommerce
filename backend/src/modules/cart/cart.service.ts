import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CartService {
    constructor(private prisma: PrismaService) {}

    async addItem(userId: string, productId: string, quantity: number) {
        const cart = await this.prisma.cart.findUnique({
            where: {
                userId
            }
        })

        const existingItem = await this.prisma.cartItem.findUnique({
            where: {
                cartId_productId: { cartId: cart!.id, productId }
            }
        })

        if (existingItem) {
            return this.prisma.cartItem.update({
                where: { cartId_productId: { cartId: cart!.id, productId } },
                data: { quantity: existingItem.quantity + quantity }
            })
        }

        return this.prisma.cartItem.create({
            data: {
                cartId: cart!.id,
                productId,
                quantity,
            }
        })
    }

    async updateItem(cartItemId: string, quantity: number) {
        if (quantity <= 0) {
            return this.removeItem(cartItemId)
        }

        return this.prisma.cartItem.update({
            where: {
                id: cartItemId
            },
            data: {
                quantity
            }
        })
    }

    async removeItem(cartItemId: string) {
        return this.prisma.cartItem.delete({
            where: {
                id: cartItemId
            }
        })
    }

    async getCart(userId: string) {
        const cart = await this.prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        })

        if (!cart) {
            return { items: [] }
        }

        return {
            items: cart.items.map(item => ({
                id: item.id,
                productId: item.productId,
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity
            }))
        }
    }
}
