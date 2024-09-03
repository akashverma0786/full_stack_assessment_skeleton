import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomesController } from './home.controller';
import { HomesService } from './home.service';
import { Home } from './entities/home.entity';
import { UserHome } from '../user_home/entities/user_home.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Home, UserHome])],
  controllers: [HomesController],
  providers: [HomesService],
})
export class HomesModule {}

// import { Module } from '@nestjs/common';
// import { HomesService } from './home.service';
// import { HomesController } from './home.controller';

// @Module({
//   controllers: [HomesController],
//   providers: [HomesService],
// })
// export class HomeModule {}
