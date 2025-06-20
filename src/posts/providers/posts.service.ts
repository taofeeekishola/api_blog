import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.services';
import { CreatePostDto } from '../dto/create-post.dto';

/**
 * Class to connect Post table and perform business logic
 */
@Injectable()
export class PostsService {

    /**
     * injecting Users service
     * @param usersService 
     */
    constructor(
        private readonly usersService: UsersService,
    ){}


    /**
     * Creatinng new posts
     */
    public create(
        @Body() createPostDto: CreatePostDto
    ){
        //create metaoptions

    }


    /**
     * This method is used to get all the post from a user
     * @param userId 
     * @returns 
     */
    public findAll(userId: string){

        const user = this.usersService.findOnebyId(userId)
        return[
            {
                user: user,
                title:'Test Tile',
                content: 'Test Content'
            },
             {
                user: user,
                title:'Test Tile 2',
                content: 'Test Content 2'
            },
        ];
    }
}
