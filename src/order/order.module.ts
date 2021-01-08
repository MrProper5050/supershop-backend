import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GoodsModule } from 'src/goods/goods.module';
import { Orders } from 'src/models/orders.model';
import { UserModule } from 'src/user/user.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports:[
    SequelizeModule.forFeature([Orders]),
    GoodsModule,
    UserModule
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
