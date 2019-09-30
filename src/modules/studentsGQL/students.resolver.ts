import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { CreateStudentDto } from '../../dto/create-student.dto';
import { StudentsArgs } from '../../dto/students.args';
import { StudentsEntity } from '../../entities/students.entity';
import { StudentsService } from './students.service';
import { EditStudentDto } from '../../dto/edit-student.dto';

const pubSub = new PubSub();

@Resolver(of => StudentsEntity)
export class StudentsResolver {
  constructor(private readonly studentsService: StudentsService) {}

  @Query(returns => [StudentsEntity])
  async students(@Args() studentsArgs: StudentsArgs): Promise<StudentsEntity[]> {
    return await this.studentsService.find(studentsArgs);
  }

  @Mutation(returns => StudentsEntity)
  async addStudent(@Args('createStudentDto') createStudentDto: CreateStudentDto): Promise<StudentsEntity> {
    const student = await this.studentsService.create(createStudentDto);
    pubSub.publish('studentAdded', { studentAdded: student });
    return student;
  }

  @Mutation(returns => StudentsEntity)
  async editStudent(@Args('editStudentDto') editStudentDto: EditStudentDto): Promise<StudentsEntity> {
    const student = await this.studentsService.edit(editStudentDto);
    pubSub.publish('studentEdited', { studentEdited: student });
    return student;
  }

  @Mutation(returns => StudentsEntity)
  deleteStudent(@Args('id') id: number) {
    return this.studentsService.delete(id);
  }

  @Subscription(returns => StudentsEntity)
  studentAdded() {
    return pubSub.asyncIterator('studentAdded');
  }

  @Subscription(returns => StudentsEntity)
  studentEdited() {
    return pubSub.asyncIterator('studentEdited');
  }
}
