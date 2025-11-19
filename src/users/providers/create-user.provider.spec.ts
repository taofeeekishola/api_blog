import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserProvider } from './create-user.provider';
import { MailService } from 'src/mail/providers/mail.service';
import { HashingProvider } from 'src/auth/provider/hashing.provider';
import { DataSource, ObjectLiteral, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { BadRequestException } from '@nestjs/common';

//creating a mock of the repository
type MockRepository<T extends ObjectLiteral = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T extends ObjectLiteral = any>(): MockRepository<T> => ({
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
})

describe('CreateUserProvider', () => {
    let provider: CreateUserProvider;
    let usersRepsitory: MockRepository;
    const user = {
        firstName: "John",
        lastName: "Doe",
        email: "john@doe",
        password: "password"
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateUserProvider,
                {provide: DataSource, useValue: {}},   
                {provide: getRepositoryToken(User), useValue: createMockRepository()},   
                {
                    provide: MailService, 
                    useValue: {senduserWelcome: jest.fn(()=> Promise.resolve())}
                },   
                {
                    provide: HashingProvider, 
                    useValue: {hashPassword: jest.fn(() => user.password)}
                },
            ],
        }).compile();

        provider = module.get<CreateUserProvider>(CreateUserProvider);
        usersRepsitory = module.get(getRepositoryToken(User));
    });

    //checks if the provider is defined
    it('should be defined', () => {
        expect(provider).toBeDefined();
    });

    describe('createUser', () => {
        describe('When the user does not exist in database', () =>{
            it('should create a new user',  async () =>{
                usersRepsitory.findOne?.mockReturnValue(null);
                usersRepsitory.create?.mockReturnValue(user);
                usersRepsitory.save?.mockReturnValueOnce(user);

                //create a new user
                const newUser = await provider.createUser(user);
                expect(usersRepsitory.findOne).toHaveBeenCalledWith({
                    where: {email: user.email},
                });
                expect(usersRepsitory.create).toHaveBeenCalledWith(user);
                expect(usersRepsitory.save).toHaveBeenCalledWith(user);

            })
        });

        describe('When the user does exist in database', () =>{
            it('throw BadRequestException', async () =>{
                usersRepsitory.findOne?.mockReturnValue(user.email);
                usersRepsitory.create?.mockReturnValue(user);
                usersRepsitory.save?.mockReturnValueOnce(user);

                //try to create a new user
                try{
                    const newUser = await provider.createUser(user);
                } catch(error){
                    expect(error).toBeInstanceOf(BadRequestException);
                }
            })
        });
    })


});
