import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateItemDto } from 'src/dto/createItem.dto';
import { Goods } from 'src/models/goods.model';

import * as shortid from 'shortid'
import * as jwt from 'jsonwebtoken'
import {config} from '../config'
import { User } from 'src/models/user.model';
import { Orders } from 'src/models/orders.model';
import { UserService } from 'src/user/user.service';
import ChangeItemDto from 'src/dto/changeItem.dto';
import { UserObject } from 'src/dto/userObject.dto';
import { Op } from 'sequelize';


@Injectable()
export class GoodsService {
    constructor(
        @InjectModel(Goods) private goodsModel: typeof Goods, 
        @InjectModel(User) private userModel: typeof User, 
        @InjectModel(Orders) private ordersModel: typeof Orders,
        private readonly userService: UserService
    ){}

    async addItem(createItemDto: CreateItemDto, token) {
        console.log("HI")
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
                include: [Goods]
            }) 
            if(candidate.role === 'common') throw ''
            
        } catch (e) {
            console.log(e)
            throw new BadRequestException("You can't add goods")
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

        try {
            return this.goodsModel.findOne({ where:{ id } })
        } catch (e) {
            throw new BadRequestException('Find Goods ERROR')
        }
        
    }

    async updateItem(changeItemDto: ChangeItemDto, userObj: UserObject){

        //find user wich has this product
        //compare userObj with founded user
        //if alright => change item
        const user = await this.userService.findOneById(userObj.id);

        for (const product of user.myGoods) {
            console.log('product.id',product.id)
            if(product.id === changeItemDto.itemId){
                console.log('2product.id',product.id)
                //yeah, it is good user
                if (Object.keys(changeItemDto.whatChanging == null || changeItemDto.whatChanging).length == 0) throw  new BadRequestException("Changing params must be")
                try {
                    //changing
                    await this.goodsModel.update(
                        {
                            ...changeItemDto.whatChanging
                        },
                        {
                            where:{ 
                                id: product.id
                            }
                    })
                    return 'OK'

                } catch (error) {
                    throw new InternalServerErrorException('Cannot update item')
                }
               


            }
        }
        throw  new BadRequestException()

    }

    async deleteItemById(id: string){
        const item = await this.getItemById(id)
        await item.destroy()
        return 'OK'
    }


   
}
