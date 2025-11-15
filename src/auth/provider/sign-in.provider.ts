import { forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from '../dto/signin.dto';
import { UsersService } from 'src/users/providers/users.services';
import { HashingProvider } from './hashing.provider';
import { GenerateTokensProvider } from './generate-tokens.provider';

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
         * inject generateTokensProvider
         */
        private readonly generateTokensProvider: GenerateTokensProvider,
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
                user.password!
            )
        } catch(error){
            throw new RequestTimeoutException(error, {
                description:"Could not compare passwords"
            })
        }

        if(!isEqual){
            throw new UnauthorizedException("Incorrect Password")
        }

        //generating the tokens
       return this.generateTokensProvider.generateTokens(user);
    }
}
