import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/modules/app.module';
import { StudentsEntity } from '../src/entities/students.entity';

describe('AppController (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/students/all')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(Array.isArray(response.body)).toBe(true);

        const test = { ...response.body[0] };
        console.log(test);
        expect(Number.isInteger(test.id)).toBe(true);
        expect(test.name !== undefined).toBe(true);
        expect(test.surname !== undefined).toBe(true);
        expect(Number.isNaN(Date.parse(test.birth))).toBe(false);
      });
  });
});
