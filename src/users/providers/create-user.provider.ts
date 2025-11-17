import { BadRequestException, forwardRef, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { HashingProvider } from 'src/auth/provider/hashing.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/providers/mail.service';

@Injectable()
export class CreateUserProvider {

    constructor(
        /**
         * Inject usersRepository
         */
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,

        /**
         * Inject hashingProvider
         */
        @Inject(forwardRef(() => HashingProvider)) //how to inject in circular dependency
        private readonly hashingprovider: HashingProvider,

        /**
         * inject mailService
         */
        private readonly mailService: MailService,

    ){}

    /**
     * The method to create a new user
     * @param createUserDto 
     */
    public async createUser(createUserDto:CreateUserDto){

        let existingUser: User | null | undefined;

        try {
            //check if user already exists with the same email
            existingUser = await this.usersRepository.findOne({
                where: {email: createUserDto.email},
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

        //handle exception
        if(existingUser){
            throw new BadRequestException(
                'The user already exists, please check your email.',
                )
        }

        //create a new user
        let newUser = this.usersRepository.create({
            ...createUserDto,
            password: await this.hashingprovider.hashPassword(createUserDto.password), 
        });

        try{
            newUser = await this.usersRepository.save(newUser);
        } catch(error) {
            throw new RequestTimeoutException(
                //can be saved in the database or logfile
                'Unable to process your request at the moment please try later',
                {
                    description: 'Error connecting to the database',
                }
            );
        }

        try{
            await this.mailService.senduserWelcome(newUser);
        } catch(error){
            throw new RequestTimeoutException(error);
        }

        return newUser;
    }
}
