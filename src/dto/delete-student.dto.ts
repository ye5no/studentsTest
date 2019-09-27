import { IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class DeleteStudentDto {
  @ApiModelProperty({ required: true, example: 10 })
  @IsInt()
  id: number;
}
