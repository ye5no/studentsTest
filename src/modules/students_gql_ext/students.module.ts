import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsServiceExt } from './students.service';
import { StudentsEntity } from '../../entities/students.entity';
import { StudentsResolverExt } from './students.resolver';
import { DateScalar } from '../../common/scalars/date.scalar';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentsEntity]),
  ],
  providers: [StudentsServiceExt, StudentsResolverExt, DateScalar],
})
export class StudentsModuleGQLExt {}
