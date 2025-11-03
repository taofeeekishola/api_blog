import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './provider/auth.service';
import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './provider/hashing.provider';
import { BcryptProvider } from './provider/bcrypt.provider';
import { SignInProvider } from './provider/sign-in.provider';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { GenerateTokensProvider } from './provider/generate-tokens.provider';


@Module({
  controllers: [AuthController],
  providers: [ 
    AuthService, 
    {
    provide: HashingProvider,
    useClass: BcryptProvider,
  }, SignInProvider, GenerateTokensProvider],
  imports: [
    forwardRef(()=> UsersModule), //circular dependecy
    ConfigModule.forFeature(jwtConfig), 
    JwtModule.registerAsync(jwtConfig.asProvider()) //ensures the jwt is injected into the application successfully
  ],
  exports: [AuthService, HashingProvider],
})
export class AuthModule {}
