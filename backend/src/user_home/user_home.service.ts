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
