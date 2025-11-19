import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserProvider } from './create-user.provider';
import { MailService } from 'src/mail/providers/mail.service';
import { HashingProvider } from 'src/auth/provider/hashing.provider';
import { DataSource, ObjectLiteral, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';

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

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateUserProvider,
                {provide: DataSource, useValue: {}},   
                {provide: getRepositoryToken(User), useValue: createMockRepository()},   
                {provide: MailService, useValue: {}},   
                {provide: HashingProvider, useValue: {}},
            ],
        }).compile();

        provider = module.get<CreateUserProvider>(CreateUserProvider);
        usersRepsitory = module.get(getRepositoryToken(User));
    });


    it('should be defined', () => {
        expect(provider).toBeDefined();
    });


});
