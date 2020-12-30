import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Op } from 'sequelize';
import { CreateUserDto } from 'src/dto/createUser.dto';
import LoginUserDto from 'src/dto/loginUser.dto';
import { UserService } from 'src/user/user.service';

import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import {config} from '../config'
import { Goods } from 'src/models/goods.model';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){}

    async registrateNewUser(createUserDto: CreateUserDto){
        let result = await this.userService.createNewUser(createUserDto)
        if(result.state !== 'OK'){
            throw new BadRequestException(result.message)
        }
        return []
    }

    async loginUser(loginUserDto: LoginUserDto) {
        let {password, userName_or_Email} = loginUserDto

        const user = await this.userService.findOneByParamsObject({
            where:{
                [Op.or]: [{username: userName_or_Email}, {email: userName_or_Email}]
            },
            include:[Goods]
        })
        if(!user) throw new NotFoundException('You must be registered')

        const passCompare = await bcrypt.compare(password, user.password)
        if(!passCompare) throw new NotFoundException('Incorrect login or password')

        const {username, email, balance, createdAt, id, purchasedGoods, myGoods} = user
        const payload = { id, username, email, balance, createdAt, purchasedGoods, myGoods }
        return jwt.sign(payload, config.jwt_secret)

    }

}
