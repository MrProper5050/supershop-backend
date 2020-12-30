import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateItemDto } from 'src/dto/createItem.dto';
import { Goods } from 'src/models/goods.model';

import * as shortid from 'shortid'
import * as jwt from 'jsonwebtoken'
import {config} from '../config'
import { User } from 'src/models/user.model';


@Injectable()
export class GoodsService {
    constructor(@InjectModel(Goods) private goodsModel: typeof Goods, @InjectModel(User) private userModel: typeof User){}

    async addItem(createItemDto: CreateItemDto, token) {
        let user;
        let candidate:User;
        // get user data from token
        try {
            user = jwt.verify(token,config.jwt_secret)
        } catch (e) {
            throw new BadRequestException('Invalid token')
        }

        //find user
        try { 
            candidate = await this.userModel.findOne({
                where:{
                    id: user.id
                }, 
                include:[Goods]
            }) 
            if(candidate.role === 'common') throw ''
            
        } catch (e) {
            console.log(e)
            throw new BadRequestException("You can't add goods" )
        }

        
        
        try {
            const id = shortid.generate()
            await this.goodsModel.create({ ...createItemDto, id, userId: user.id})


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
