import { IsArray, IsNumber } from 'class-validator';

export class UpdateHomeUsersDto {
  @IsNumber()
  homeId: number;

  @IsArray()
  newUserIds: number[];
}
