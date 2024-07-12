import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from './user.service';
import { UserIdCheckMiddleware } from 'src/middlewares/user-id-check.middleware';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdCheckMiddleware).forRoutes({
      path: 'users/:id',
      method: RequestMethod.ALL,
    });
  }
}
