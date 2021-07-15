import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';

export class CreateTaskDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly status: boolean;
}

export class UpdateTaskDTO extends PartialType(CreateTaskDTO) {}
