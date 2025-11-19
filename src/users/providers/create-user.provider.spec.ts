import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserProvider } from './create-user.provider';
import { MailService } from 'src/mail/providers/mail.service';
import { HashingProvider } from 'src/auth/provider/hashing.provider';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';




describe('CreateUserProvider', () => {
    let provider: CreateUserProvider;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateUserProvider,
                {provide: DataSource, useValue: {}},   
                {provide: getRepositoryToken(User), useValue: {}},   
                {provide: MailService, useValue: {}},   
                {provide: HashingProvider, useValue: {}},
            ],
        }).compile();

        provider = module.get<CreateUserProvider>(CreateUserProvider);
    });


    it('should be defined', () => {
        expect(provider).toBeDefined();
    });


});
