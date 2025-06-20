import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PatchPostDto } from './dto/patch-post.dto';

/**
 * Class to create the routing logic for Posts
 */
@Controller('posts')
export class PostsController {

    /**
     * Injecting the postservice in the controller
     * @param postService 
     */
    constructor(
        private readonly postService: PostsService
    ){}

    /**
     * The route to get all posts from a user
     * @param userId 
     * @returns 
     */
    @Get('{/:userId}')
    public getPosts(@Param('userId') userId: string){
        return this.postService.findAll(userId);
    }
    

    /**
     * The route to create a new post
     * @param createPostDto 
     */
    @ApiOperation({
        summary:'Creates a new blog post'
    })
    @ApiResponse({
        status: 201,
        description:'You get a 201 response if your post is created sucessfully'
    })
    @Post()
    public createPost(@Body() createPostDto: CreatePostDto){
        console.log(createPostDto);
    }


    /**
     * The route to update a post
     * @param patchPostDto 
     */
    @ApiOperation({
        summary:'Updates an existing blog post'
    })
    @ApiResponse({
        status: 200,
        description:'You get a 200 response if your post is updated sucessfully'
    })
    @Patch()
    public updatePost(@Body() patchPostDto: PatchPostDto){
        console.log(patchPostDto);
    }
}
