import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { StudentsEntity } from '../../entities/students.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';
import { CreateStudentDto } from '../../dto/create-student.dto';
import { EditStudentDto } from '../../dto/edit-student.dto';

const pathConfig = path.resolve(__dirname, '../../tools/config', '**', '!(*.d).{ts,js}');
const pathEntities = path.resolve(__dirname, '../../entities', '**', '*.entity{.ts,.js}');

describe('StudentsController', () => {
  let studentsController: StudentsController;
  let all: StudentsEntity[];
  const testStudent: CreateStudentDto = {
    name: 'Mister',
    surname: 'Anderson',
    birth: '01-01-2001',
  };
  const testEditedStudent: EditStudentDto = {
    id: 0,
    name: 'Master',
    surname: 'Anderssen',
    birth: '01.01.2012',
  };
  let createdId: number;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.load(pathConfig),
        TypeOrmModule.forRootAsync({
          useFactory: (config: ConfigService) => ({
            ...config.get('database'),
            entities: [pathEntities],
          }),
          inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([StudentsEntity]),
      ],
      controllers: [StudentsController],
      providers: [StudentsService],
    }).compile();

    studentsController = app.get<StudentsController>(StudentsController);
  });

  describe('all', () => {
    it('should return an array of students', async () => {
      all = await studentsController.findAll();
      expect(all[0]).toBeInstanceOf(StudentsEntity);
    });
  });

  describe('create', () => {
    it('should return created new student', async () => {
      const created = await studentsController.create(testStudent);
      createdId = created.id;
      console.log(created);
      expect(created.id).not.toBeNaN();
      expect(created.name).toBe(testStudent.name);
      expect(created.surname).toBe(testStudent.surname);
      expect(created.birth).toBe(testStudent.birth);
    });
  });

  describe('edit', () => {
    it('should return edited student', async () => {
      testEditedStudent.id = createdId;
      const edited = await studentsController.edit(testEditedStudent);
      console.log(edited);
      expect(edited.id).toBe(createdId);
      expect(edited.name).toBe(testEditedStudent.name);
      expect(edited.surname).toBe(testEditedStudent.surname);
      expect(edited.birth).toBe(testEditedStudent.birth);
    });
  });

  describe('delete', () => {
    it('should return deleted student', async () => {
      const deleted = await studentsController.delete({ id: createdId });
      console.log(deleted);
      expect(deleted.name).toBe(testEditedStudent.name);
      expect(deleted.surname).toBe(testEditedStudent.surname);
      expect(Math.abs(Date.parse(deleted.birth.toString()) - Date.parse(testEditedStudent.birth))).toBeLessThanOrEqual(1000 * 60 * 60 * 24);
    });
  });
});
