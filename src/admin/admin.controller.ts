import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { Add_SubBalance } from 'src/dto/admin/add_subBalance.dto';
import { CreateNewUserByAdminDto } from 'src/dto/admin/createNewUserByAdmin.dto';
import ChangeItemDto from 'src/dto/changeItem.dto';
import { CreateItemDto } from 'src/dto/createItem.dto';
import { UserObject } from 'src/dto/userObject.dto';
import { GoodsService } from 'src/goods/goods.service';
import { OrderService } from 'src/order/order.service';
import { UserService } from 'src/user/user.service';

@Controller('a/d/m/i/n')
export class AdminController {
    constructor(
        private readonly userService: UserService,
        private readonly goodsService: GoodsService,
        private readonly orderService: OrderService,
        
    ){}
/*           /*\  
            //-\\
           ///-\\\
          ///---\\\
         ///-----\\\
        ///-------\\\
       ///---------\\\
      ///-----------\\\
     ///-------------\\\   
    ///-----USERS-----\\\

*/
    @Get('users/getAll')
    async getAllUsers(){
       return await this.userService.getAllUsers();
    }
    @Get('users/getById/:id')
    async getUserById(@Param('id') id: string ){
        return await this.userService.findOneById(id)
    }
    @Post('users/createNew')
    async createNewUser(@Body() createNewUserByAdminDto: CreateNewUserByAdminDto){
        return await this.userService.createNewUser_admin(createNewUserByAdminDto)
    }
    @Delete('users/delete/:id')
    async deleteUserById(@Param('id') id: string){
        return await this.userService.deleteUserById(id)
    }
    @Put('users/addBalance')
    async addBalance(@Body() add_SubBalance: Add_SubBalance){
        return await this.userService.addBalance(add_SubBalance)
    }
    @Put('users/subBalance')
    async subBalance(@Body() add_SubBalance: Add_SubBalance){
        return await this.userService.subBalance(add_SubBalance)
    }
/*
             /*\  
            //-\\
           ///-\\\
          ///---\\\
         ///-----\\\
        ///-------\\\
       ///---------\\\
      ///-----------\\\
     ///-------------\\\   
    ///-----GOODS-----\\\

*/

    @Get('goods/getAll')
    async getAllGoods(){
        return await this.goodsService.getAllItems()
    }
    @Get('goods/getById/:id')
    async getProductById(@Param('id') id: string){
        return await this.goodsService.getItemById(id)
    }
    @Post('goods/createNew')
    async createNewProductIntoSomebody(@Body() createItemDto:CreateItemDto, addTheProductToThisUser:UserObject){
        return await this.goodsService.addItem(createItemDto, addTheProductToThisUser)
    }
    @Delete('goods/delete/:id')
    async deleteProduct(@Param('id') id: string){
        return await this.goodsService.deleteItemById(id)
    }
    @Patch('goods/change')
    async changeProduct(@Body() changeItemDto: ChangeItemDto, userObj: UserObject){
        return await this.goodsService.updateItem(changeItemDto, userObj)
    }
  
    
}
