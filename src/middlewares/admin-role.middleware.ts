import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';

@Injectable()
export class AdminRoleMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(req.user)
    if(req.user.role !== 'admin'){
      throw new NotFoundException()
      
    }
    next();
  }
}
