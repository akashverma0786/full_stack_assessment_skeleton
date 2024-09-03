import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HomesModule } from './home/home.module';
import { UserHomeModule } from './user_home/user_home.module';
import { User } from './users/entities/user.entity'; // Import User entity
import { Home } from './home/entities/home.entity'; // Import Home entity
import { UserHome } from './user_home/entities/user_home.entity'; // Import UserHome entity
// import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // Database type
      host: 'localhost', // Your database host
      port: 3306, // Your database port
      username: 'db_user', // Your MySQL username
      password: '6equj5_db_user', // Your MySQL password
      database: 'home_db', // Your database name
      entities: [User, Home, UserHome], // Include all entities here
      synchronize: false, // Auto synchronize entity schema with database (set to false in production)
    }),
    UsersModule,
    HomesModule,
    UserHomeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// @Module({
//   imports: [
//     ConfigModule.forRoot(), // Load environment variables
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: async (configService: ConfigService) => ({
//         type: 'mysql',
//         host: configService.get<string>('DB_HOST') || 'localhost', // Default to localhost if not set
//         port: parseInt(configService.get<string>('DB_PORT'), 10) || 3306, // Default to 3306 if not set
//         username: configService.get<string>('DB_USER') || 'db_user',
//         password: configService.get<string>('DB_PASSWORD') || '6equj5_db_user',
//         database: configService.get<string>('DB_NAME') || 'home_db',
//         entities: [User, Home, UserHome],
//         synchronize: true, // Set to false in production
//       }),
//       inject: [ConfigService],
//     }),
//     UsersModule,
//     HomesModule,
//     UserHomeModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { UsersModule } from './users/users.module';
// import { HomeModule } from './home/home.module';
// import { UserHomeModule } from './user-home/user-home.module';
// import { UserHomeModule } from './user_home/user_home.module';

// @Module({
//   imports: [UsersModule, HomeModule, UserHomeModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
