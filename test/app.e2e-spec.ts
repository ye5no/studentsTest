import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { EditStudentDto } from '../src/dto/edit-student.dto';

describe('AppController (e2e)', () => {
  let app;
  let test: EditStudentDto;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/students/all')
      .expect(200)
      .expect('Content-Type', /json/)

    expect(Array.isArray(response.body)).toBe(true);

    test = { ...response.body[0] };
    console.log(test);
    expect(Number.isInteger(test.id)).toBe(true);
    expect(test.name !== undefined).toBe(true);
    expect(test.surname !== undefined).toBe(true);
    expect(Number.isNaN(Date.parse(test.birth))).toBe(false);
  });

  it('/graphql', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `query q($arg: Float!) {
          student (id: $arg) {
            id
            name
            surname
            birth
          }
        }`,
        operationName: 'q',
        variables: { arg: test.id },
      })
      .expect('Content-Type', /json/)
      .expect(200);

    const result = response.body.data.student;
    console.log(result);
    expect(result.id).toBe(test.id);
    expect(result.name).toBe(test.name);
    expect(result.surname).toBe(test.surname);
    expect(result.birth).toBe(test.birth);
  });

  afterAll(async () => {
    await app.close();
  });
});
