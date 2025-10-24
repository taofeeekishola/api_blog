import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.services';
import { SignInDto } from '../dto/signin.dto';
import { SignInProvider } from './sign-in.provider';

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
    ){}

    /**
     * 
     * @param signInDto 
     */
    public async signIn(signInDto: SignInDto){
       return await this.signInProvider.signIn(signInDto)
    }

    /**
     * placeholder
     * @returns 
     */
    public isAuth(){
        return true;
    }
}
