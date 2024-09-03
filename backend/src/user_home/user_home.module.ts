import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserHome } from './entities/user_home.entity'; // Import the UserHome entity
import { UserHomeService } from './user_home.service'; // Import the UserHome service
import { UserHomeController } from './user_home.controller'; // Import the UserHome controller

@Module({
  imports: [
    TypeOrmModule.forFeature([UserHome]), // Register UserHome entity for TypeORM
  ],
  controllers: [UserHomeController],
  providers: [UserHomeService],
  exports: [UserHomeService], // Export UserHomeService if needed by other modules
})
export class UserHomeModule {}

// import { Module } from '@nestjs/common';
// import { UserHomeService } from './user_home.service';
// import { UserHomeController } from './user_home.controller';

// @Module({
//   controllers: [UserHomeController],
//   providers: [UserHomeService],
// })
// export class UserHomeModule {}
