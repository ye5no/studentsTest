import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentsInterface } from '../../interfaces/students.interface';
import { StudentsEntity } from '../../entities/students.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentsEntity)
    private readonly studentsRepository: Repository<StudentsEntity>,
  ) {}

  find(): Promise<StudentsEntity[]> {
    return this.studentsRepository
      .createQueryBuilder()
      .orderBy('id', 'ASC')
      .getMany();
  }

  create(student: StudentsInterface): Promise<StudentsEntity> {
    return this.studentsRepository.save(student);
  }

  async edit(id: number, editedStudent: StudentsInterface): Promise<StudentsEntity> {
    let student = await this.studentsRepository.findOne(id);
    if (!student) throw new HttpException({ error: 'No student id' }, 406);
    student = Object.assign(student, editedStudent);
    return this.studentsRepository.save(student);
  }

  async delete(id: number): Promise<StudentsEntity> {
    const student = await this.studentsRepository.findOne(id);
    if (!student) throw new HttpException({ error: 'No student id' }, 406);
    return this.studentsRepository.remove(student);
  }
}
