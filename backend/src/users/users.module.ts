import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserHome } from '../user_home/entities/user_home.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserHome])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
