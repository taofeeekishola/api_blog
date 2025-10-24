import { forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from '../dto/signin.dto';
import { UsersService } from 'src/users/providers/users.services';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class SignInProvider {

    constructor(
        /**
         * Inject userService
         */
        @Inject(forwardRef(() => UsersService))
        private readonly userService: UsersService,

        /**
         * Inject HashingProvider
         */
        private readonly hashingProvider: HashingProvider,

        /**
         * Inject jwtService
         */
        private readonly jwtService: JwtService,

        /**
         * Inject jwtConfiguration
         */
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
    ){}

    public async signIn(signInDto: SignInDto){
        //Find the user using email ID
        //throw an exception if user not found
        let user = await this.userService.findOneByEmail(signInDto.email);

        //compare password to hash
        let isEqual:boolean = false;

        try{
            isEqual = await this.hashingProvider.comparePassword(
                signInDto.password,
                user.password
            )
        } catch(error){
            throw new RequestTimeoutException(error, {
                description:"Could not compare passwords"
            })
        }

        if(!isEqual){
            throw new UnauthorizedException("Incorrect Password")
        }

        //send confirmation
        //generating access token

        const accessToken = await this.jwtService.signAsync(
            {
                sub: user.id,
                email: user.email,
            },
            {
               audience: this.jwtConfiguration.audience,
               issuer: this.jwtConfiguration.issuer,
               secret: this.jwtConfiguration.secret,
               expiresIn: this.jwtConfiguration.accessTokenTtl,
            },
        
        );


        return {
            accessToken,
        }
    }
}
