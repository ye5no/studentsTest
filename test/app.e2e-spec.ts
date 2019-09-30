import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app;

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

    const test = { ...response.body[0] };
    console.log(test);
    expect(Number.isInteger(test.id)).toBe(true);
    expect(test.name !== undefined).toBe(true);
    expect(test.surname !== undefined).toBe(true);
    expect(Number.isNaN(Date.parse(test.birth))).toBe(false);
  });

  it('/graphql', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: `{
          students {
            id
            name
            surname
            birth
          }
        }`,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const test = response.body.data.students[0];
    console.log(test);
    expect(Number.isInteger(test.id)).toBe(true);
    expect(test.name !== undefined).toBe(true);
    expect(test.surname !== undefined).toBe(true);
    expect(Number.isNaN(Date.parse(test.birth))).toBe(false);
  });

  afterAll(async () => {
    await app.close();
  });
});
