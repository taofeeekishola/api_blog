import { Injectable, forwardRef, Inject } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-user-params.dto";
import { AuthService } from "src/auth/provider/auth.service";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user.entity";
import { CreateUserDto } from "../dtos/create-user.dto";

/**
 * Class to connect to Users table and perform business operations
 */
@Injectable()
export class UsersService{

    
    constructor(
        /**
        * Injecting the Auth service into the User service
        */
        @Inject(forwardRef(()=> AuthService))
        private readonly authService: AuthService,

        /**
         * Injecting usersRepository
         */
        @InjectRepository(User)
        private usersRepository:Repository<User>,
    ){}

    /**
     * The method to create a new user
     * @param createUserDto 
     */
    public async createUser(createUserDto:CreateUserDto){
        //check if user already exists with the same email
        const existingUser = await this.usersRepository.findOne({
            where: {email: createUserDto.email},
        });

        //handle exception

        //create a new user
        let newUser = this.usersRepository.create(createUserDto);
        newUser = await this.usersRepository.save(newUser);

        return newUser;
    }

    /**
     * 
     * The method to get all the users from the database
     */
    public findAll(
        getUsersParamsDto: GetUsersParamDto,
        limit: number,
        page: number,
    ){

        const isAuth = this.authService.isAuth();

        console.log(isAuth);
        return [
            {
                firstName: "John",
                email: 'jogn@gamil.com',
            },
             {
                firstName: "Taofeek",
                email: 'taofeek@gamil.com',
            }
        ]
    }

    /**
     * Finding a single user by the id of the user
     * @param id 
     * @returns 
     */
    public findOnebyId(id:string){
        return {
            id: id,
            firstName: "Ola",
            email: 'taofeek@gamil.com',
        }
    }
}