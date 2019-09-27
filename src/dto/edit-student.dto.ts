import { IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { CreateStudentDto } from './create-student.dto';

export class EditStudentDto extends CreateStudentDto {
  @ApiModelProperty({ required: true, example: 10 })
  @IsInt()
  id: number;
}
