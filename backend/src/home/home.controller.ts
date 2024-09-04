import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
import { HomesService } from './home.service';
import { Home } from './entities/home.entity';
import { UpdateHomeUsersDto } from './dto/update-home-users.dto';

@Controller('homes')
export class HomesController {
  constructor(private readonly homesService: HomesService) {}

  @Get()
  findAll(): Promise<Home[]> {
    return this.homesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Home> {
    return this.homesService.findOne(+id);
  }

  @Get('/find-by-user/:userId')
  findByUser(@Param('userId') userId: string): Promise<Home[]> {
    return this.homesService.findByUser(+userId);
  }
  @Patch('update-users')
  async updateHomeUsers(@Body() updateHomeUsersDto: UpdateHomeUsersDto) {
    return await this.homesService.updateHomeUsers(updateHomeUsersDto);
  }
}
