import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PatchPostDto } from './dto/patch-post.dto';
import { GetPostsDto } from './dto/get-posts.dto';

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
    public getPosts(
        @Param('userId') userId: string, 
        @Query() postQuery: GetPostsDto
    ){  
        return this.postService.findAll(postQuery ,userId);
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
        return this.postService.create(createPostDto);
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
        return this,this.postService.update(patchPostDto)
    }

    @Delete()
    public deletePost(@Query('id', ParseIntPipe) id:number){
        return this.postService.delete(id)
    }


}
