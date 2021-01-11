import { BadRequestException, Body, Controller, Post, Res } from '@nestjs/common';
import { create } from 'domain';
import { Response } from 'express';
import { CreateUserDto } from 'src/dto/createUser.dto';
import LoginUserDto from 'src/dto/loginUser.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
        ){}

    @Post('signin')
    async login(@Body() loginUserDto: LoginUserDto, @Res({passthrough:true}) res: Response){
        
        const token = await this.authService.loginUser(loginUserDto)
        console.log("token", token)
        res.cookie('access_token', token, { signed:true, httpOnly: true, sameSite:true })
        return 'OK';
    }

    @Post('signup')
    async registration(@Body() createUserDto: CreateUserDto){
        return await this.userService.createNewUser(createUserDto)
    }

}
