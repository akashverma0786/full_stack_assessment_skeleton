import { PartialType } from '@nestjs/mapped-types';
import { CreateUserHomeDto } from './create-user_home.dto';

export class UpdateUserHomeDto extends PartialType(CreateUserHomeDto) {}
