import { BadRequestException, HttpException, Injectable, NestMiddleware, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request, Response } from 'express';

import { User } from 'src/models/user.model';


@Injectable()
export class RoleMiddleware implements NestMiddleware {

  constructor(@InjectModel(User) private userModel: typeof User){}

  async use(req: any, res: Response, next: () => void) {
    const token = req.signedCookies['access_token']
  
// req.hostname
    console.log(req.originalUrl)
    switch (req.originalUrl) {
      //ORDERS
      case 'orders/state':
        //alright
        next();
      break;
    
      case 'orders/gen':

        if(req.user.role === 'seller' || req.user.role === 'admin'){
          throw new BadRequestException('Invalid role')
        }

        //alright
        next();
      break;

      //GOODS
      case 'goods/getAll':
        next();
      break;

      //ANOTHER
      default:

        if(req.user.role !== 'seller' && req.user.role !== 'admin') {
          throw new BadRequestException('Invalid role')
        }

        //alright
        next();
      break;
    }

  }
}
