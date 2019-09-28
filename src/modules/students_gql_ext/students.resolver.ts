import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { StudentsEntity } from '../../entities/students.entity';
import { StudentsServiceExt } from './students.service';

@Resolver(of => StudentsEntity)
export class StudentsResolverExt {
  constructor(private readonly studentsService: StudentsServiceExt) {}

  @Query(returns => StudentsEntity)
  async student(@Args('id') id: number): Promise<StudentsEntity> {
    console.log('gql_ext');
    const student = await this.studentsService.findOneById(id);
    if (!student) throw new NotFoundException(id);
    return student;
  }
}
