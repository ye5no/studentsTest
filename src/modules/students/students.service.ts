import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentsEntity } from '../../entities/students.entity';
import { StudentsInterface } from '../../interfaces/students.interface';

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

  async edit(student: StudentsInterface): Promise<StudentsEntity> {
    const studentDB = await this.studentsRepository.findOne(student.id);
    if (!studentDB) throw new HttpException({ error: 'No student id' }, 406);
    return this.studentsRepository.save(student);
  }

  async delete(id: number): Promise<StudentsEntity> {
    const studentDB = await this.studentsRepository.findOne(id);
    if (!studentDB) throw new HttpException({ error: 'No student id' }, 406);
    return this.studentsRepository.remove(studentDB);
  }
}
