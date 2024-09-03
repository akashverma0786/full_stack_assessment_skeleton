import { Test, TestingModule } from '@nestjs/testing';
import { UserHomeController } from './user_home.controller';
import { UserHomeService } from './user_home.service';

describe('UserHomeController', () => {
  let controller: UserHomeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserHomeController],
      providers: [UserHomeService],
    }).compile();

    controller = module.get<UserHomeController>(UserHomeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
