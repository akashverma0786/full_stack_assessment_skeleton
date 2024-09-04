import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Home } from './entities/home.entity';
import { UserHome } from '../user_home/entities/user_home.entity';
import { UpdateHomeUsersDto } from './dto/update-home-users.dto';

@Injectable()
export class HomesService {
  constructor(
    @InjectRepository(Home)
    private homesRepository: Repository<Home>,

    @InjectRepository(UserHome)
    private userHomeRepository: Repository<UserHome>,
  ) {}

  findAll(): Promise<Home[]> {
    return this.homesRepository.find();
  }

  // findOne(home_id: number): Promise<Home> {
  //   return this.homesRepository.findOneBy({ home_id });
  // }
  findOne(home_id: number): Promise<Home> {
    return this.homesRepository.findOne({
      where: { home_id },
      relations: ['userHomes', 'userHomes.user'], // Add this line to include users
    });
  }

  async findByUser(userId: number): Promise<Home[]> {
    const userHomes = await this.userHomeRepository.find({
      where: { user_id: userId },
      relations: ['home'],
    });
    return userHomes.map((userHome) => userHome.home);
  }
  async updateHomeUsers(updateHomeUsersDto: UpdateHomeUsersDto) {
    const { homeId, newUserIds } = updateHomeUsersDto;

    // Remove existing relationships
    await this.userHomeRepository.delete({ home_id: homeId });

    // Add new relationships
    const userHomeRelations = newUserIds.map((userId) => ({
      user_id: userId,
      home_id: homeId,
    }));
    await this.userHomeRepository.save(userHomeRelations);

    return { message: 'Users updated successfully' };
  }
}

// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Home } from './entities/home.entity';

// @Injectable()
// export class HomesService {
//   constructor(
//     @InjectRepository(Home)
//     private homesRepository: Repository<Home>,
//   ) {}

//   findAll(): Promise<Home[]> {
//     return this.homesRepository.find();
//   }

//   findOne(home_id: number): Promise<Home> {
//     return this.homesRepository.findOneBy({ home_id });
//   }
// }

// // import { Injectable } from '@nestjs/common';
// // import { CreateHomeDto } from './dto/create-home.dto';
// // import { UpdateHomeDto } from './dto/update-home.dto';

// // @Injectable()
// // export class HomeService {
// //   create(createHomeDto: CreateHomeDto) {
// //     return 'This action adds a new home';
// //   }

// //   findAll() {
// //     return `This action returns all home`;
// //   }

// //   findOne(id: number) {
// //     return `This action returns a #${id} home`;
// //   }

// //   update(id: number, updateHomeDto: UpdateHomeDto) {
// //     return `This action updates a #${id} home`;
// //   }

// //   remove(id: number) {
// //     return `This action removes a #${id} home`;
// //   }
// // }
