import { MinLength, MaxLength, IsOptional, IsInt } from 'class-validator';
import { IsCustomRegex } from '../decorators/IsCustomRegex';
import { ApiModelProperty } from '@nestjs/swagger';

export class EditStudentDto {
  @ApiModelProperty({ required: true, example: 10 })
  @IsInt()
  readonly id: number;

  @ApiModelProperty({ required: false, example: 'John' })
  @IsOptional()
  @IsCustomRegex('engRusRegex', { message: 'Wrong name' })
  @MinLength(2, { message: 'Name is too short' })
  @MaxLength(30, { message: 'Name is too long' })
  readonly name: string;

  @ApiModelProperty({ required: false, example: 'Snow' })
  @IsOptional()
  @IsCustomRegex('engRusRegex', { message: 'Wrong name' })
  @MinLength(2, { message: 'Surname is too short' })
  @MaxLength(30, { message: 'Surname is too long' })
  readonly surname: string;

  @ApiModelProperty({ required: false, example: '15-01-2019' })
  @IsOptional()
  @IsCustomRegex('dateRegex', { message: 'Date must be 15-01-2019' })
  readonly birth: string;
}
