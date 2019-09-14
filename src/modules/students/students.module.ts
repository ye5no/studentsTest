import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { StudentsEntity } from '../../entities/students.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentsEntity]),
    StudentsEntity,
  ],
  providers: [StudentsService, StudentsEntity],
  controllers: [StudentsController],
})
export class StudentsModule {}
