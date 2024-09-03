import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserHome } from '../user_home/entities/user_home.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(UserHome)
    private userHomeRepository: Repository<UserHome>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(user_id: number): Promise<User> {
    return this.usersRepository.findOneBy({ user_id });
  }

  async findByHome(homeId: number): Promise<User[]> {
    const userHomes = await this.userHomeRepository.find({
      where: { home_id: homeId },
      relations: ['user'],
    });
    return userHomes.map((userHome) => userHome.user);
  }
}

// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from './entities/user.entity';

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectRepository(User)
//     private usersRepository: Repository<User>,
//   ) {}

//   findAll(): Promise<User[]> {
//     return this.usersRepository.find();
//   }

//   findOne(user_id: number): Promise<User> {
//     return this.usersRepository.findOneBy({ user_id });
//   }
// }

// // import { Injectable } from '@nestjs/common';
// // import { CreateUserDto } from './dto/create-user.dto';
// // import { UpdateUserDto } from './dto/update-user.dto';

// // @Injectable()
// // export class UsersService {
// //   create(createUserDto: CreateUserDto) {
// //     return 'This action adds a new user';
// //   }

// //   findAll() {
// //     return `This action returns all users`;
// //   }

// //   findOne(id: number) {
// //     return `This action returns a #${id} user`;
// //   }

// //   update(id: number, updateUserDto: UpdateUserDto) {
// //     return `This action updates a #${id} user`;
// //   }

// //   remove(id: number) {
// //     return `This action removes a #${id} user`;
// //   }
// // }
