import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
// 引入Mongo
import { MongooseModule } from '@nestjs/mongoose';
// 引入jwt
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot('mongodb://root:root@127.0.0.1:27017/txdb2024?authSource=admin')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
