import { MinLength, MaxLength } from 'class-validator';
import { IsCustomRegex } from '../decorators/IsCustomRegex';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiModelProperty({ required: true, example: 'John' })
  @IsCustomRegex('engRusRegex', { message: 'Wrong name' })
  @MinLength(2, { message: 'Name is too short' })
  @MaxLength(30, { message: 'Name is too long' })
  readonly name: string;

  @ApiModelProperty({ required: true, example: 'Snow' })
  @IsCustomRegex('engRusRegex', { message: 'Wrong name' })
  @MinLength(2, { message: 'Surname is too short' })
  @MaxLength(30, { message: 'Surname is too long' })
  readonly surname: string;

  @ApiModelProperty({ required: true, example: '15-01-2019' })
  @IsCustomRegex('dateRegex', { message: 'Date must be 15-01-2019' })
  readonly birth: string;
}
