import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.services';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';


@Module({
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
    imports: [forwardRef(()=> AuthModule),
        TypeOrmModule.forFeature([User]) //passing an array for entities
    ],
})
export class UsersModule {}
