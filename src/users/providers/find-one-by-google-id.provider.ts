import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * class to find user with googleId
 */
@Injectable()
export class FindOneByGoogleIdProvider {
    constructor(
        /**
         * inject userRepository
         */
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    public async findOneByGoogleId(googleId: string){
        return await this.userRepository.findOneBy({googleId});
    }
}
