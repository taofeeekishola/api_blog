import { Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class FindOneUserByEmailProvider {
    constructor(
        /**
         * Inject the usersRepository
         */
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ){}

    public async findOneByEmail(email: string){
        let user: User | undefined | null = undefined;

        try{
            //null if user is not found
            user = await this.usersRepository.findOneBy({
                email: email,
            })
        } catch(error){
            throw new RequestTimeoutException(error,{
                description: 'Could not fetch the user'
            })
        }

        if(!user){
            throw new UnauthorizedException('User does not exit')
        }

        return user;
    };
}
