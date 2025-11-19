import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.services';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { CreateUserProvider } from './create-user.provider';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';



describe('UsersService', () => {
    let service: UsersService;

    beforeEach(async () => {

        //creating a mock of the method createUser in CreateUserProvider class
        const mockCreateUserprovider: Partial<CreateUserProvider> = {
            createUser: (createUserDto:CreateUserDto)=> Promise.resolve({ //this retruns an object
                id:12,
                firstName: createUserDto.firstName,
                lastName: createUserDto.lastName,
                email: createUserDto.email,
                password: createUserDto.password,
            }),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {provide: CreateUserProvider, useValue: mockCreateUserprovider},
                {provide: DataSource, useValue:{}},
                {provide: getRepositoryToken(User), useValue:{}},
                {provide: FindOneByGoogleIdProvider, useValue: {}},
                {provide: FindOneUserByEmailProvider, useValue: {}},
                {provide: UsersCreateManyProvider, useValue: {}},
            ],
        }).compile();

        service = module.get<UsersService>(UsersService)

    });

    //testing if the userService is defined
    it('should be defined', () => {
        expect(service).toBeDefined();
    });


    describe('createUser', () =>{
        //tetsing if the createUser method is defined
        it('should be defined', ()=>{
            expect(service.createUser).toBeDefined();
        });

        //testing if the createUser method is calling the createUser method in the createUserProvider
        it('should call createUser on CreateUserProvider', async ()=>{
            let user = await service.createUser({
                firstName: "John",
                lastName: "Doe",
                email: 'joe@email.com',
                password: 'pasword'
            });
            expect(user.firstName).toEqual("John")
        });
    })
});
