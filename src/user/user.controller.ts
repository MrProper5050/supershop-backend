import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {

    // constructor(private readonly userService: UserService){}

    // @Post('create')
    // async createUser(@Body() createUserDto: CreateUserDto) {
    //     let result = await this.userService.createNewUser(createUserDto)
    //     if(result.state !== 'OK'){
    //         throw new BadRequestException(result.message)
    //     }
    //     return []
    // }

    
}
