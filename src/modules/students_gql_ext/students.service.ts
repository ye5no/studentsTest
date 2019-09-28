import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentsEntity } from '../../entities/students.entity';

@Injectable()
export class StudentsServiceExt {
  constructor(
    @InjectRepository(StudentsEntity)
    private readonly studentsRepository: Repository<StudentsEntity>,
  ) {}

  async findOneById(id: number): Promise<StudentsEntity> {
    return await this.studentsRepository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
  }
}
