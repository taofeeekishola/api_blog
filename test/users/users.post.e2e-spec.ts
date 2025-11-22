import * as request from 'supertest';



import { INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import { ConfigService } from '@nestjs/config';
import { dropDatabase } from 'test/helpers/drop-database.helper';
import { bootstarpNestApplication } from 'test/helpers/bootstrap-nest-application.helper';

describe('[Users] @Post Endpoints', () => {
  let app: INestApplication<App>;
  let config: ConfigService;

  beforeEach(async () => {
    //Instantiating the application
    app = await bootstarpNestApplication();

    //extract config
    config = app.get<ConfigService>(ConfigService);
   
  });

  afterEach(async()=>{
    await dropDatabase(config);
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
