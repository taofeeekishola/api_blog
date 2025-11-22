import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../../src/app.module';

describe('[Users] @Post Endpoints', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async()=>{
    await app.close();
  });

  it.todo('/users -Endpoint is public');
  it.todo('/users - firstname is mandatory');
  it.todo('/users - email is mandatory');
  it.todo('/users - password is mandatory');
  it.todo('/users - Valid request sucessfully creates user');
  it.todo('/users - password is not returned in response');
  it.todo('/users - googleId is not returned in response');

});
