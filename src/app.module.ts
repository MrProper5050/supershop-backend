import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { AdminModule } from './admin/admin.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
  AuthModule, 
  UserModule, 
  ProfileModule, 
  AdminModule,
  SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'supershop',
      autoLoadModels:true,
      synchronize:true,
      logging: true
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
