import { BadRequestException, HttpException, Injectable, NestMiddleware, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request, Response } from 'express';

import { User } from 'src/models/user.model';


@Injectable()
export class RoleMiddleware implements NestMiddleware {

  constructor(@InjectModel(User) private userModel: typeof User){}

  async use(req: any, res: Response, next: () => void) {
    const token = req.signedCookies['access_token']
    let candidate:User;
  

    console.log(req.path)
    switch (req.path) {
      //ORDERS
      case '/state':
      
        try {
          candidate = await this.userModel.findOne({
            where:{
              id: req.user.id
            }
          })
        
        } catch (error) {
          throw new NotFoundException('User not found')
        }

        //alright
        next();
      break;
    
      case '/gen':

        try {
          candidate = await this.userModel.findOne({
            where:{
              id: req.user.id
            }
          })
        
        } catch (error) {
          throw new NotFoundException('User not found')
        }

        console.log(candidate.role)

        if(candidate.role === 'seller' || candidate.role === 'admin'){
          throw new BadRequestException('Invalid role')
        }

        //alright
        next();
      break;

      //GOODS
      case '/getAll':
        next();
      break;

      //ANOTHER
      default:
       
        try {
          
          candidate = await this.userModel.findOne({
            where:{
              id: req.user.id
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
      break;
    }

  }
}
