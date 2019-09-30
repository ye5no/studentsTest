import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentsEntity } from '../../entities/students.entity';
import { StudentsInterface } from '../../interfaces/students.interface';
import { StudentsArgs } from '../../dto/students.args';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentsEntity)
    private readonly studentsRepository: Repository<StudentsEntity>,
  ) {}

  find(args: StudentsArgs): Promise<StudentsEntity[]> {
    const { skip, take } = args;
    return this.studentsRepository
      .createQueryBuilder()
      .orderBy('id', 'ASC')
      .limit(take)
      .offset(skip)
      .getMany();
  }

  create(student: StudentsInterface): Promise<StudentsEntity> {
    return this.studentsRepository.save({ ...student });
  }

  async edit(student: StudentsInterface): Promise<StudentsEntity> {
    const studentDB = await this.studentsRepository.findOne(student.id);
    if (!studentDB) throw new NotFoundException(student.id);
    return this.studentsRepository.save({ ...student });
  }

  async delete(id: number): Promise<StudentsEntity> {
    const studentDB = await this.studentsRepository.findOne(id);
    if (!studentDB) throw new NotFoundException(id);
    return this.studentsRepository.remove(studentDB);
  }
}
