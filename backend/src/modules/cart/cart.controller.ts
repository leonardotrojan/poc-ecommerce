import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('cart')
export class CartController {
    constructor(private cartService: CartService) {}

    @UseGuards(JwtAuthGuard)
    @Post('items')
    async addItem(
        @Req() req: any,
        @Body() body: { productId: string; quantity?: number },
    ) {
        return this.cartService.addItem(req.user.userId, body.productId, body.quantity || 1)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('items/:id')
    async updateItem(
        @Param('id') id: string,
        @Body() body: { quantity: number }
    ) {
        return this.cartService.updateItem(id, body.quantity)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('items/:id')
    async removeItem(@Param('id') id: string) {
        return this.cartService.removeItem(id)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getCart(@Req() req: any) {
        return this.cartService.getCart(req.user.userId)
    }
}
