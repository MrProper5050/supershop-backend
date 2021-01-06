import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateItemDto } from 'src/dto/createItem.dto';
import { GoodsService } from './goods.service';

@Controller('goods')
export class GoodsController {
    constructor(private goodsService: GoodsService){}
    
    @Get()
    async getAll() {
        return await this.goodsService.getAllItems()
    }

    @Get(':id')
    async getOneById(@Param('id') id: string){
        return await this.goodsService.getItemById(id)
    }

    @Post('s/create')
    async createNewItem(@Body() createItemDto: CreateItemDto, @Req()req: Request){
        let token = req.signedCookies['access_token']  
        return await this.goodsService.addItem(createItemDto, token)
    }

    @Delete('delete/:id')
    async delteItem(@Param('id') id: string){
        return await this.goodsService.deleteItemById(id)
    }


    @Post('order')
    async generateOrder(@Body() generateOrderDto: GenerateOrderDto){
        return await this.goodsService.generateOrder(generateOrderDto)


    }

}
