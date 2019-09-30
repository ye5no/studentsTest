import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsService } from './students.service';
import { StudentsEntity } from '../../entities/students.entity';
import { StudentsResolver } from './students.resolver';
import { DateScalar } from '../../common/scalars/date.scalar';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentsEntity]),
  ],
  providers: [StudentsService, StudentsResolver, DateScalar],
})
export class StudentsModuleGQL {}
