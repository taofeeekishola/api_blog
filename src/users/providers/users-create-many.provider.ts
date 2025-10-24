import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class UsersCreateManyProvider {

    constructor(
        /**
         * Inject Datasource
         */
        private readonly datascouce: DataSource,
    ){}

     public async createMany(createManyUsersDto: CreateManyUsersDto){
        let newUsers: User[] = []

        //Create Query Runner Instance
        const queryRunner = this.datascouce.createQueryRunner();

        try{
            //Connect Query Runner to datasource
            await queryRunner.connect();

            //Start Transaction
            await queryRunner.startTransaction();
        } catch(error){
            throw new RequestTimeoutException('Could not connect to the database')
        }

        try{
            for(let user of createManyUsersDto.users){
                let newUser = queryRunner.manager.create(User, user);
                let result = await queryRunner.manager.save(newUser);

                //keeping a track of all the users created
                newUsers.push(result)
            }

            //If successful commit
            await queryRunner.commitTransaction();
        } catch(error){
            //If unsuccessful rollback
            await queryRunner.rollbackTransaction();

            throw new ConflictException('Could not complete the transaction',{
                description: String(error),
            })
        } finally{
            try{
                //Release connection
                await queryRunner.release();
            } catch(error){
                throw new RequestTimeoutException("Could not release the connection",{
                    description: String(error)
                })
            }
           
        }
        
        return newUsers;
    }
}
