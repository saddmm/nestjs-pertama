import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import cookieSession = require('cookie-session');

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/mongoosedb'),

    UsersModule,

    AuthModule,
  ],
  providers: [
    AppService,
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) },
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieSession({ keys: ['random'] })).forRoutes('*');
  }
}
