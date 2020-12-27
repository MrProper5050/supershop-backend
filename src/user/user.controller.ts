import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Get('getAll')
    async getAll(){
        return this.userService.getAllUsers()
    }

    @Post('create')
    async createUser(@Body() createUserDto: CreateUserDto) {
        let result = await this.userService.createNewUser(createUserDto)
        if(result.state !== 'OK'){
            throw new BadRequestException(result.message)
        }
        return []
    }

    @Delete('delete/:id')
    async deleteUser(@Param('id') id: string){
        return this.userService.deleteUserById(id)
    }
}
