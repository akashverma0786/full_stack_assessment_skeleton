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

// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { UserHomeService } from './user_home.service';
// import { CreateUserHomeDto } from './dto/create-user_home.dto';
// import { UpdateUserHomeDto } from './dto/update-user_home.dto';

// @Controller('user-home')
// export class UserHomeController {
//   constructor(private readonly userHomeService: UserHomeService) {}

//   @Post()
//   create(@Body() createUserHomeDto: CreateUserHomeDto) {
//     return this.userHomeService.create(createUserHomeDto);
//   }

//   @Get()
//   findAll() {
//     return this.userHomeService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.userHomeService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateUserHomeDto: UpdateUserHomeDto) {
//     return this.userHomeService.update(+id, updateUserHomeDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.userHomeService.remove(+id);
//   }
// }
