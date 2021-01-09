import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import ChangeItemDto from 'src/dto/changeItem.dto';
import { ChangeOrderStateDto } from 'src/dto/changeOrderState.dto';
import { CreateItemDto } from 'src/dto/createItem.dto';
import { GoodsService } from './goods.service';

@Controller('goods')
export class GoodsController {
    constructor(private goodsService: GoodsService){}
    
    @Get('getAll')
    async getAll() {
        return await this.goodsService.getAllItems()
    }

    @Get(':id')
    async getOneById(@Param('id') id: string){
        return await this.goodsService.getItemById(id)
    }

    @Post('create')
    async createNewItem(@Body() createItemDto: CreateItemDto, @Req()req: Request){
        let token = req.signedCookies['access_token']  
        return await this.goodsService.addItem(createItemDto, token)
    }

    @Patch('change')
    async changeItem(@Body() changeItemDto: ChangeItemDto, @Req() req: any){
        return await this.goodsService.updateItem(changeItemDto, req.user)
    }

    @Delete('delete/:id')
    async delteItem(@Param('id') id: string){
        return await this.goodsService.deleteItemById(id)
    }



}
