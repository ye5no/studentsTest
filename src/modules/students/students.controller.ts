import { Controller, Get, Post, Body } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsEntity } from '../../entities/students.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { CreateStudentDto } from '../../dto/create-student.dto';
import { EditStudentDto } from '../../dto/edit-student.dto';
import { DeleteStudentDto } from '../../dto/delete-student.dto';

@ApiBearerAuth()
@ApiUseTags('students')
@Controller('students')
@ApiResponse({ status: 200, description: 'Success' })
@ApiResponse({ status: 406, description: 'Not Acceptable' })
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
  ) {}

  @Get('all')
  @ApiOperation({ title: 'Get all students' })
  findAll(): Promise<StudentsEntity []> {
    return this.studentsService.find();
  }

  @Post('create')
  @ApiOperation({ title: 'Create student' })
  create(@Body() createStudentDto: CreateStudentDto): Promise<StudentsEntity> {
    return this.studentsService.create(createStudentDto);
  }

  @Post('edit')
  @ApiOperation({ title: 'Edit student' })
  edit(@Body() editStudentDto: EditStudentDto): Promise<StudentsEntity> {
    return this.studentsService.edit(editStudentDto);
  }

  @Post('delete')
  @ApiOperation({ title: 'Delete student' })
  delete(@Body() deleteStudentDto: DeleteStudentDto): Promise<StudentsEntity> {
    return this.studentsService.delete(deleteStudentDto.id);
  }
}
