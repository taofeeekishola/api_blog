import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.services';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import profileConfig from './config/profile.config';
import jwtConfig from 'src/auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';


@Module({
    controllers: [UsersController],
    providers: [
        UsersService, 
        UsersCreateManyProvider, 
        CreateUserProvider, 
        FindOneUserByEmailProvider
    ],
    exports: [UsersService],
    imports: [
        forwardRef(()=> AuthModule),
        TypeOrmModule.forFeature([User]), //passing an array for entities
        ConfigModule.forFeature(profileConfig),
        ConfigModule.forFeature(jwtConfig), 
        JwtModule.registerAsync(jwtConfig.asProvider()) //ensures the jwt is injected into the application successfully
    ],
})
export class UsersModule {}
