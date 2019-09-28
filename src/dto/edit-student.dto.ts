import { IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { CreateStudentDto } from './create-student.dto';
import { Field, InputType } from 'type-graphql';

@InputType()
export class EditStudentDto extends CreateStudentDto {
  @Field()
  @ApiModelProperty({ required: true, example: 10 })
  @IsInt()
  id: number;
}
