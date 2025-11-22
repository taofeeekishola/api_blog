import * as request from 'supertest';



import { INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import { ConfigService } from '@nestjs/config';
import { dropDatabase } from 'test/helpers/drop-database.helper';
import { bootstarpNestApplication } from 'test/helpers/bootstrap-nest-application.helper';
import { completeUser } from './users.post.e2e-spec.sample-data';

describe('[Users] @Post Endpoints', () => {
  let app: INestApplication<App>;
  let config: ConfigService;
  let httpServer: App;

  beforeEach(async () => {
    //Instantiating the application
    app = await bootstarpNestApplication();

    //extract config
    config = app.get<ConfigService>(ConfigService);
    httpServer = app.getHttpServer(); //extracting the server needed for supertest
   
  });

  afterEach(async()=>{
    await dropDatabase(config);
    await app.close();
  });

  it('/users - Endpoint is public', ()=>{
    console.log(completeUser);
    return request(httpServer)
    .post('/users')
    .send({})
    .expect(400)
  });

  it.todo('/users - firstname is mandatory');
  it.todo('/users - email is mandatory');
  it.todo('/users - password is mandatory');
  it.todo('/users - Valid request sucessfully creates user');
  it.todo('/users - password is not returned in response');
  it.todo('/users - googleId is not returned in response');

});
