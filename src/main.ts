import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; //swagger impotts

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*
  * Use Validation pipes globally 
  */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //prevents values not in the dto from entering our app
      forbidNonWhitelisted: true, // throws an error if an extra value is passed from the user
      transform: true, //this transforms the incoming request to an instance of the DTO class after validation
  })
);

/*
* swagger configuration
*/
const config = new DocumentBuilder()
.setTitle("NestJs Masterclass - Blog app API")
.setDescription('Use the base API URL as http://localhost:3000')
.setTermsOfService('http://localhost:3000/terms-of-service')
.setLicense(
  'MIT License',
  'https://aniwatchtv.to'
)
.addServer('http://localhost:3000')
.setVersion('1.0').build(); //creating a new document builder object

//Instantiate Document
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);



  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
