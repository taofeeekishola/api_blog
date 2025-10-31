import { BadRequestException, Body, Injectable, RequestTimeoutException } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.services';
import { CreatePostDto } from '../dto/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { User } from 'src/users/user.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dto/patch-post.dto';
import { Tag } from 'src/tags/tag.entity';
import { GetPostsDto } from '../dto/get-posts.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interfaces';
import { CreatePostProvider } from './create-post.provider';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

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
         * inject metaOptionsRepository
         */
        @InjectRepository(MetaOption)
        private readonly metaOptionsRepository: Repository<MetaOption>,

        /**
         * Inject TagsService
         * 
         */
        private readonly tagsService: TagsService,

        /**
         * Injecting paginationProvider
         */
        private readonly paginationProvider: PaginationProvider,

        /**
         * inject createPostPorvider
         */
        private readonly createPostPorvider: CreatePostProvider
    ){}


    /**
     * Creatinng new posts
     */
    public async create(createPostDto: CreatePostDto, user: ActiveUserData){
        return await this.createPostPorvider.create(createPostDto, user);
    }


    /**
     * This method is used to get all the post from a user
     * @param userId 
     * @returns 
     */
    public async findAll( postQuery: GetPostsDto, 
        userId: string,
    ): Promise<Paginated<Post>> {
        let posts = await this.paginationProvider.paginateQuery({
            limit: postQuery.limit,
            page: postQuery.page
        }, 
            this.postsRepository,
        );

        return posts;
       
    }


    public async update(patchpostDto: PatchPostDto){

        let tags: Tag[] = [];

        let post: Post | null | undefined;

        //find the tags
        try {
            tags = await this.tagsService.findMultipleTags(patchpostDto.tags ?? []);
        } catch(error){
            throw new RequestTimeoutException(
                'Unable top rocess your request at the moment please try again'
            );
        }

        /**
         * Number of tags need to be equal
         */
        if(!tags || tags.length !== patchpostDto.tags?.length){
            throw new BadRequestException(
                'Please check your tag Ids and ensure they are corret'
            )
        }
         

        //find the posts
        try {
             post = await this.postsRepository.findOneBy({
            id: patchpostDto.id,
        });
        } catch(error){
            throw new RequestTimeoutException(
                'Unable top rocess your request at the moment please try again'
            );
        }

        if(!post){
            throw new BadRequestException('The post ID does not exist')
        }
        

        // update the properties
        post!.title = patchpostDto.title ?? post!.title;
        post!.content = patchpostDto.content ?? post!.content;
        post!.status = patchpostDto.status ?? post!.status;
        post!.postType = patchpostDto.postType ?? post!.postType;
        post!.slug = patchpostDto.slug ?? post!.slug;
        post!.featuredImageUrl = patchpostDto.featuredImageUrl ?? post!.featuredImageUrl;
        post!.publishOn = patchpostDto.publishOn ?? post!.publishOn


        //assign the new tags
        post!.tags = tags;

        //save the post and return
        try{
            await this.postsRepository.save(post!);
        } catch(error){
             throw new RequestTimeoutException(
                'Unable top process your request at the moment please try again'
            );
        } 
        return post
    }

    /**
     * This method is used to delete a post
     * @param id 
     * @returns 
     */
    public async delete(id: number){
        //find the post
        // let post =  await this.postsRepository.findOneBy({id});

        //deleting the post
        await this.postsRepository.delete(id);

        return {deleted: true, id}
    }
}
