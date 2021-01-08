import { Body, Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ChangeOrderStateDto } from 'src/dto/changeOrderState.dto';
import { GenerateOrderDto } from 'src/dto/generateOrder.dto';
import { OrderService } from './order.service';


@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService){}

    @Get('my')
    async imSellerGiveMeOrders_please(@Req() req: Request){
        const token = req.signedCookies['access_token'];
        return this.orderService.getOrdersOfThisSeller(token)
    }

    @Post('gen')
    async generateOrder(@Body() generateOrderDto: GenerateOrderDto, @Req() req: any){
        return await this.orderService.generateOrder(generateOrderDto, req.user)
    }

    @Patch('state')
    async changeOrderState(@Body() changeOrderSateDto: ChangeOrderStateDto, @Req() req: any) {
        
        return await this.orderService.changeOrderState(changeOrderSateDto, req.user)
    }
}
