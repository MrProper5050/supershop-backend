import { BadRequestException, Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Get('getAll')
    async getAll(){
        return this.userService.getAllUsers()
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        let result = await this.userService.createNewUser(createUserDto)
        if(result.state !== 'OK'){
            throw new BadRequestException(result.message)
        }
        return []
    }
}
