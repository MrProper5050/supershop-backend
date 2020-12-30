import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Goods } from 'src/models/goods.model';
import { User } from 'src/models/user.model';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';

@Module({
  imports:[
    SequelizeModule.forFeature([Goods, User])
  ],
  controllers: [GoodsController],
  providers: [GoodsService]
})
export class GoodsModule {}
