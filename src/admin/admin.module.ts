import { Module } from '@nestjs/common';
import { GoodsModule } from 'src/goods/goods.module';
import { OrderModule } from 'src/order/order.module';
import { UserModule } from 'src/user/user.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports:[UserModule, GoodsModule, OrderModule],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
