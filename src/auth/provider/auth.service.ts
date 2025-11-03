import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.services';
import { SignInDto } from '../dto/signin.dto';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { RefreshTokensProvider } from './refresh-tokens.provider';

/**
 * Class for authentication
 */
@Injectable()
export class AuthService {

    /**
     * Injecting Users service
     * @param usersService 
     */
    constructor(
        /**
         * Injecting usersService
         */
        @Inject(forwardRef(()=> UsersService))
        private readonly usersService: UsersService,

        /**
         * Inject signInProvider
         */
        private readonly signInProvider: SignInProvider,

        /**
         * inject refreshTokensProvider
         */
        private readonly refreshTokensProvider: RefreshTokensProvider
    ){}

    /**
     * method to sign in
     * @param signInDto 
     */
    public async signIn(signInDto: SignInDto){
       return await this.signInProvider.signIn(signInDto)
    }

    /**
     * method to get a new access token along with refresh token
     * @param refreshTokenDto 
     * @returns 
     */
    public async refreshTokens( refreshTokenDto: RefreshTokenDto){
        return await this.refreshTokensProvider.refreshTokens(refreshTokenDto);
    }
}
