import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from 'src/current-user/current-user.interceptor';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: UserSchema}])],
  providers: [AuthService, UsersService, {provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor}],
  controllers: [AuthController]
})
export class AuthModule {}
