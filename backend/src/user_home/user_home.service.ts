import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserHome } from './entities/user_home.entity';

@Injectable()
export class UserHomeService {
  constructor(
    @InjectRepository(UserHome)
    private userHomeRepository: Repository<UserHome>,
  ) {}

  findAll(): Promise<UserHome[]> {
    return this.userHomeRepository.find({ relations: ['user', 'home'] });
  }

  findOne(id: number): Promise<UserHome> {
    return this.userHomeRepository.findOne({
      where: { id },
      relations: ['user', 'home'],
    });
  }
}

// import { Injectable } from '@nestjs/common';
// import { CreateUserHomeDto } from './dto/create-user_home.dto';
// import { UpdateUserHomeDto } from './dto/update-user_home.dto';

// @Injectable()
// export class UserHomeService {
//   create(createUserHomeDto: CreateUserHomeDto) {
//     return 'This action adds a new userHome';
//   }

//   findAll() {
//     return `This action returns all userHome`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} userHome`;
//   }

//   update(id: number, updateUserHomeDto: UpdateUserHomeDto) {
//     return `This action updates a #${id} userHome`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} userHome`;
//   }
// }
