import { Injectable, forwardRef, Inject, RequestTimeoutException, BadRequestException } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-user-params.dto";
import { AuthService } from "src/auth/provider/auth.service";
import { DataSource, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user.entity";
import { CreateUserDto } from "../dtos/create-user.dto";
import { ConfigService, ConfigType } from "@nestjs/config";
import profileConfig from "../config/profile.config";
import { UsersCreateManyProvider } from "./users-create-many.provider";
import { CreateManyUsersDto } from "../dtos/create-many-users.dto";
import { CreateUserProvider } from "./create-user.provider";
import { FindOneUserByEmailProvider } from "./find-one-user-by-email.provider";
import { FindOneByGoogleIdProvider } from "./find-one-by-google-id.provider";

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

        /**
         * Injecting profileconfig
         */
        @Inject(profileConfig.KEY)
        private readonly profileConfiguration: ConfigType<typeof profileConfig>,

        /**
         * Inject usersCreateManyProvider
         */
        private readonly usersCreateManyProvider: UsersCreateManyProvider,

        /**
         * Inject createUserprovider
         */
        private readonly createuserProvider: CreateUserProvider,

        /**
         * Inject findOneUserByEmailProvider
         */
        private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,

        /**
         * inject findOneByGoogleIdProvider
         */
        private readonly findOneByGoogleIdProvider: FindOneByGoogleIdProvider,
    ){}

    /**
     * The method to create a new user
     * @param createUserDto 
     */
    public async createUser(createUserDto:CreateUserDto){
        return this.createuserProvider.createUser(createUserDto);
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

        // const isAuth = this.authService.isAuth();

        // console.log(isAuth);

       console.log(this.profileConfiguration)
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
    public async findOnebyId(id:number){
        let user: User | null | undefined;

        try {
            user = await this.usersRepository.findOneBy({
            id,
        });
        } catch(error){
             throw new RequestTimeoutException(
                //can be saved in the database or logfile
                'Unable to process your request at the moment please try later',
                {
                    description: 'Error connecting to the database',
                }
            );
        }

        /**
         * Handle the user does not exist exception
         */
        if(!user){
            throw new BadRequestException("This user id does not exist")
        }

        
        return user;
    }

    /**
     * method to create many users
     * @param createUsersDto 
     * @returns 
     */
    public async createMany(createManyUsersDto: CreateManyUsersDto){
       return await this.usersCreateManyProvider.createMany(createManyUsersDto);
    }

    /**
     * proxy email to export to auth service
     * @param email 
     * @returns 
     */
    public async findOneByEmail(email: string){
        return await this.findOneUserByEmailProvider.findOneByEmail(email)
    }

    /**
     * proxy email to export to auth service
     * @param googleId 
     */
    public async findOneByGoogleId(googleId: string){
        return await this.findOneByGoogleIdProvider.findOneByGoogleId(googleId);
    }
}