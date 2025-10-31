import { BadRequestException, Body, ConflictException, Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UsersService } from 'src/users/providers/users.services';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsService } from 'src/tags/providers/tags.service';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { Tag } from 'src/tags/tag.entity';

/**
 * classs to create a new post
 */
@Injectable()
export class CreatePostProvider {

    constructor(
          /**
         * inject userService
         */
        private readonly usersService: UsersService,

        /**
         * Inject postRepository
         */
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,

        /**
         * Inject TagsService
         * 
         */
        private readonly tagsService: TagsService,
    ){
    }

    /**
     * method to create a new post by a user
     * @param createPostDto 
     * @param user 
     * @returns 
     */
    public async create(createPostDto: CreatePostDto, user: ActiveUserData){

       let author: User | undefined;
        let tags: Tag[] | undefined;


        try{
            //find author from database based on the authorId
            author =  await this.usersService.findOnebyId(user.sub);

            //find tags
            tags = await this.tagsService.findMultipleTags(createPostDto.tags ?? [])
        } catch(error){
            throw new ConflictException(error);
        }

        if(createPostDto.tags?.length !== tags.length){
            throw new BadRequestException('Please check your tag Ids')
        }

        //create post
        let post =  this.postsRepository.create({
            ...createPostDto, 
            author: author as User,
            tags: tags,
        });

        try {
            //return the post
            return await this.postsRepository.save(post)
        } catch(error){
            throw new ConflictException(error, {
                description: 'Ensure post slug is unique and not a duplicate'
            })
        }

        
    }
}
