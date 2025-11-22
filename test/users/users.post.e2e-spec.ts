import * as request from 'supertest';



import { INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import { ConfigService } from '@nestjs/config';
import { dropDatabase } from 'test/helpers/drop-database.helper';
import { bootstarpNestApplication } from 'test/helpers/bootstrap-nest-application.helper';
import { completeUser, missingEmail, missingFirstName, missingPassword } from './users.post.e2e-spec.sample-data';

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
    return request(httpServer)
    .post('/users')
    .send({})
    .expect(400)
  });

  it('/users - firstname is mandatory', ()=>{
    return request(httpServer).post('/users').send(missingFirstName()).expect(400);
  });

  it('/users - email is mandatory', ()=>{
    return request(httpServer).post('/users').send(missingEmail()).expect(400);
  });

  it('/users - password is mandatory', ()=>{
    return request(httpServer).post('/users').send(missingPassword()).expect(400);
  });

  it('/users - Valid request sucessfully creates user', ()=>{
    const user = completeUser();
    return request(httpServer)
    .post('/users')
    .send(user)
    .expect(201)
    .then(({body})=>{
        expect(body.data).toBeDefined();
        expect(body.data.firstName).toBe(user.firstName);
        expect(body.data.lastName).toBe(user.lastName);
        expect(body.data.email).toBe(user.email);
    });
  });

  it('/users - password is not returned in response', ()=>{
    return request(httpServer)
    .post('/users')
    .send(completeUser())
    .expect(201)
    .then(({body})=>{
        expect(body.data).toBeDefined();
        expect(body.data.password).toBeUndefined();
    });
  });

  it('/users - googleId is not returned in response', ()=>{
    return request(httpServer)
    .post('/users')
    .send(completeUser())
    .expect(201)
    .then(({body})=>{
        expect(body.data).toBeDefined();
        expect(body.data.googleId).toBeUndefined();
    });
  });

});
