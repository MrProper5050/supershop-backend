import { Controller, Get, Req, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ProfileService } from './profile.service';


@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService){}


    @Get()
    getMyProfile(@Req() req: Request){
        const token = req.signedCookies['access_token']
        
        return this.profileService.getMyProfile(token)

        
    }
}
