import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from '../src/quiz/entities/quiz.entity';
import { Question } from '../src/question/entities/question.entity';
import { QuizModule } from "../src/quiz/quiz.module";

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Quiz, Question],
          logging: false,
          synchronize: true,
        }),
        QuizModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/quiz (GET) initialy empty', async () => {
    return request(app.getHttpServer())
      .get('/quiz')
      .expect(200)
      .expect([]);
  });

  const quiz_dto = {
    title: 'Some questions',
  };

  it('/quiz (POST) succeeds', async () => {
    const result = await request(app.getHttpServer())
      .post('/quiz')
      .send(quiz_dto)
      .expect(201);
    expect(result.body).toEqual({
      id: 1,
      title: quiz_dto.title,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
    const createdAt = new Date(result.body.createdAt);
    const updatedAt = new Date(result.body.updatedAt);
    expect(createdAt).toEqual(updatedAt);
  });

});
