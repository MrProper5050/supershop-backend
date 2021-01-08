import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Goods } from 'src/models/goods.model';
import { Orders } from 'src/models/orders.model';
import { User } from 'src/models/user.model';
import { UserModule } from 'src/user/user.module';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';

@Module({
  imports:[
    SequelizeModule.forFeature([Goods, User, Orders]),
    UserModule
  ],
  controllers: [GoodsController],
  providers: [GoodsService],
  exports:[GoodsService]
})
export class GoodsModule {}
