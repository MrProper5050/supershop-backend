import { Injectable, NestMiddleware, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request, Response } from 'express';

import * as jwt from 'jsonwebtoken'
import { User } from 'src/models/user.model';
import {config} from '../config'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(@InjectModel(User) private userModel: typeof User){}

  async use(req: Request, res: Response, next: () => void) {
    if(req.signedCookies['access_token']){
      const token = req.signedCookies['access_token']
      let user;

      try {
        user = jwt.verify(token, config.jwt_secret)

        try {
          const candidate:User = await this.userModel.findOne({
            where:{
              id: user.id
            }
          })
          //alright
          next();
        } catch (error) {
          throw new NotFoundException('User not found')
        }


      } catch (e) {
        throw new UnauthorizedException('Invalid token ^2')
      }

    }else{
      throw new UnauthorizedException()
    }

  }
}
