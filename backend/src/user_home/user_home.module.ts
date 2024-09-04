import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserHome } from './entities/user_home.entity';
import { UserHomeService } from './user_home.service';
import { UserHomeController } from './user_home.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserHome]), // Register UserHome entity for TypeORM
  ],
  controllers: [UserHomeController],
  providers: [UserHomeService],
  exports: [UserHomeService],
})
export class UserHomeModule {}
