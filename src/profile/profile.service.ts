import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
import {config} from '../config'

@Injectable()
export class ProfileService {

    async getMyProfile(token: string){
        let decoded;
        try {
            decoded = jwt.verify(token, config.jwt_secret)
        } catch (error) {
            throw new UnauthorizedException('Invalid token')
        }
        return decoded
        
    }

}
