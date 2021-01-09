import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GoodsService } from 'src/goods/goods.service';
import { Orders } from 'src/models/orders.model';

import * as shortid from 'shortid'
import * as jwt from 'jsonwebtoken'
import {config} from '../config'
import { UserService } from 'src/user/user.service';
import { User } from 'src/models/user.model';
import { GenerateOrderDto } from 'src/dto/generateOrder.dto';
import { ChangeOrderStateDto } from 'src/dto/changeOrderState.dto';
import { UserObject } from 'src/dto/userObject.dto';

@Injectable()
export class OrderService {

    constructor(
        private readonly goodsService: GoodsService,
        private readonly userService: UserService,
        @InjectModel(Orders) private ordersModel: typeof Orders
        ){}

    async generateOrder(generateOrderDto: GenerateOrderDto, userObj: UserObject){

        //check to buy from yourself
        await this.checkToBuyFromYourself(userObj)
        
        //balance checker
        await this.balanceChecker(userObj, generateOrderDto)

        //find this item
        if(
        typeof generateOrderDto.itemId === 'undefined'    ||
        typeof generateOrderDto.itemTitle === 'undefined' ||
        typeof generateOrderDto.amount === 'undefined'    ||
        generateOrderDto.amount <= 0)
        {
            throw new BadRequestException('Invalid data')
        }

        const item = await this.goodsService.getItemById( generateOrderDto.itemId )
        if(!item) throw new BadRequestException("Cannot find item")

        console.log('item.userId',item.userId)
        console.log('userObj.id',userObj.id)
        // console.log('item.userId',item.userId)

        //generate order
        try {
            const id = shortid.generate();
            await this.ordersModel.create(
            {
               id, 
               ownerId: item.userId, 
               buyerId: userObj.id,
               info:{ ...generateOrderDto },
               state:'processing'
            },
            {
                include:[{all:true}]
            }
            )
            return 'OK'
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Cannot generate order')
        }
        




    }

    async getOrdersOfThisSeller(token: string){
        let user ;
        // get user data from token
        user = jwt.verify(token, config.jwt_secret)
        console.log(user)

        try {
            const orders = await this.ordersModel.findAll({where:{
                userId: user.id
            }})
            if(orders) return orders
            else return 'You have no orders yet'
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Cannot find orders')
        }
        
    }

    async changeOrderState(changeOrderSateDto: ChangeOrderStateDto, userObject: UserObject){

        const user = await this.userService.findOneById(userObject.id)
        if( !user ) throw new BadRequestException('Cannot find user')

        if(user.role === 'common' && changeOrderSateDto.state === 'delivered'){
            //find order wich we want change
            try {
                await this.ordersModel.update({state: changeOrderSateDto.state},{where:{
                    id: changeOrderSateDto.orderId
                }})
                return 'OK'
            } catch (error) {
                throw new BadRequestException('Invalid order Id')
            }
            

        }
        else if(
            (user.role === 'admin' || user.role === 'seller') && 
            (changeOrderSateDto.state === 'processing' || changeOrderSateDto.state === 'sended')
        ){
            //find order wich we want change
            try {
                await this.ordersModel.update({state: changeOrderSateDto.state},{where:{
                    id: changeOrderSateDto.orderId
                }})
                return 'OK'
            } catch (error) {
                throw new BadRequestException('Invalid order Id')
            }
        }

        throw new BadRequestException()
    }





///-----VALIDATORS-----///

    async checkToBuyFromYourself(userObj:UserObject) {
        let user;
    
        user =  await this.userService.findOneById(userObj.id)
        if(!user) throw new InternalServerErrorException("Cannot find user")

        if (user.role === 'seller' || user.role === 'admin') {
            throw new BadRequestException("You can't buy products")
        }
        
       
        return 'OK'
    }

    async balanceChecker(userObj: UserObject, generateOrderDto: GenerateOrderDto){
        //find in USER table
        //multiply product amount by price
        //compare user balance with end price
        const user = await this.userService.findOneById(userObj.id)
        const item = await this.goodsService.getItemById( generateOrderDto.itemId )
        const endPrice = ( item.price * generateOrderDto.amount)

        if(user.balance < endPrice){
            throw new BadRequestException("Not enough balance");
        }

        return 'OK'
        
    }
}


