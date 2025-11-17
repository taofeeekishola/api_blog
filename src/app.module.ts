import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaginationModule } from './common/pagination/pagination.module';
import  appConfig  from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';
import jwtConfig from './auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AccessTokenGuard } from './auth/guards/access-token/access-token.guard';
import { AuthenticationGuard } from './auth/guards/authentication/authentication.guard';
import { DataResponseInterceptor } from './common/interceptors/data-response/data-response.interceptor';
import { MailModule } from './mail/mail.module';

//gets the environemnt we are currently working with
const ENV = process.env.NODE_ENV


@Module({
  imports: [UsersModule, PostsModule, AuthModule, 
  ConfigModule.forRoot({
    isGlobal: true, //this ensures that the module is avalibale insside all the modules
    // envFilePath: ['.env.development'],
    // envFilePath: !ENV ? '.env': `.env.${ENV}`
    //  envFilePath: '.env.development'
    envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    load: [appConfig, databaseConfig],
    validationSchema: environmentValidation
  }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService: ConfigService) =>({
        type:'postgres',
        // entities:[User,Post],
        autoLoadEntities: configService.get('database.autoLoadEntities'), //AUTOLOADING ENTITIES INTO THE DATABASE
        synchronize: configService.get('database.synchronize'),
        port: configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        host:configService.get('database.host'),
        database:configService.get('database.name'),
      })
    }), 
    ConfigModule.forFeature(jwtConfig), 
    JwtModule.registerAsync(jwtConfig.asProvider()), //ensures the jwt is injected into the application successfully
    TagsModule, 
    MetaOptionsModule, 
    PaginationModule, MailModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard // this is the class that APP_GUARD uses
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: DataResponseInterceptor
    },
    AccessTokenGuard,
  ],
})
export class AppModule {} 
