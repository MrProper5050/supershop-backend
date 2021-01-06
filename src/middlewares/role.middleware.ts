import { BadRequestException, HttpException, Injectable, NestMiddleware, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request, Response } from 'express';

import * as jwt from 'jsonwebtoken'
import { User } from 'src/models/user.model';
import {config} from '../config'

@Injectable()
export class RoleMiddleware implements NestMiddleware {

  constructor(@InjectModel(User) private userModel: typeof User){}

  async use(req: Request, res: Response, next: () => void) {
    const token = req.signedCookies['access_token']
      let candidate:User;
      let user;
      try {
        user = jwt.verify(token, config.jwt_secret)

      } catch (e) {
        throw new UnauthorizedException('Invalid token ^role')
      }

      try {
        candidate = await this.userModel.findOne({
          where:{
            id: user.id
          }
        })
       
        
      } catch (error) {
        throw new NotFoundException('User not found')
      }

      if(candidate.role !== 'seller' && candidate.role !== 'admin'){
        throw new BadRequestException('Invalid role')
      }

      //alright
      next();
  }
}
