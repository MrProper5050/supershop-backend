import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

    @Post('create')
    async createNewItem(@Body() createItemDto: CreateItemDto){
        return await this.goodsService.addItem(createItemDto)
    }

    @Delete('delete/:id')
    async delteItem(@Param('id') id: string){
        return await this.goodsService.deleteItemById(id)
    }

}
