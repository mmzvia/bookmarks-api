import { Module } from '@nestjs/common';
import { UsersController, UsersController2 } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController, UsersController2],
  providers: [UsersService],
})
export class UsersModule {}
