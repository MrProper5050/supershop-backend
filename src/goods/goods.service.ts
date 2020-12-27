import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateItemDto } from 'src/dto/createItem.dto';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { Goods } from 'src/models/goods.model';

import * as shortid from 'shortid'

@Injectable()
export class GoodsService {
    constructor(@InjectModel(Goods) private goodsModel: typeof Goods){}

    async addItem(createItemDto: CreateItemDto) {
        const id = shortid.generate()
        try {
            await this.goodsModel.create({ ...createItemDto, id })
            return 'OK'
        } catch (error) {
            throw new InternalServerErrorException('Failure to create new item')
        }
    }

    async getAllItems(): Promise<Goods[]>{
        return this.goodsModel.findAll()
    }

    async getItemById(id: string): Promise<Goods>{
        return this.goodsModel.findOne({ where:{ id } })
    }

    async updateItem(){

    }

    async deleteItemById(id: string){
        const item = await this.getItemById(id)
        await item.destroy()
        return 'OK'
    }

}
