import { Controller, Get, Param } from '@nestjs/common';
import { UserHomeService } from './user_home.service';
import { UserHome } from './entities/user_home.entity';

@Controller('user-home')
export class UserHomeController {
  constructor(private readonly userHomeService: UserHomeService) {}

  @Get()
  findAll(): Promise<UserHome[]> {
    return this.userHomeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserHome> {
    return this.userHomeService.findOne(+id);
  }
}
