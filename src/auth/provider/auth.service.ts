import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.services';

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
        @Inject(forwardRef(()=> UsersService))
        private readonly usersService: UsersService,
    ){}

    /**
     * placeholder
     * @param email 
     * @param password 
     * @param id 
     * @returns 
     */
    public login(email: string, password: string, id:string){
        const user = this.usersService.findOnebyId('1234');

        return 'Sample Token';
    }

    /**
     * placeholder
     * @returns 
     */
    public isAuth(){
        return true;
    }
}
