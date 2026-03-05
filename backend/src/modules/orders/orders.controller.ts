import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
    constructor (private ordersService: OrdersService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    createOrder(@Req() req) {
        const userId = req.user.userId
        return this.ordersService.createOrder(userId)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    getOrders(@Req() req) {
        return this.ordersService.getOrders(req.user.userId)
    }
}
