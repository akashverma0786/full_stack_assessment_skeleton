import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HomesModule } from './home/home.module';
import { UserHomeModule } from './user_home/user_home.module';
import { User } from './users/entities/user.entity';
import { Home } from './home/entities/home.entity';
import { UserHome } from './user_home/entities/user_home.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'db_user',
      password: '6equj5_db_user',
      database: 'home_db',
      entities: [User, Home, UserHome],
      synchronize: false, //switching to true may alter the user_home table !! Don't switch
    }),
    UsersModule,
    HomesModule,
    UserHomeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
