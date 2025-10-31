import { Controller, Get, Post, Patch, Put, Delete, Param, Query, Body, Req, Headers, Ip, ParseIntPipe, DefaultValuePipe, ValidationPipe, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-user-params.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.services';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

/**
 * Class to create the routing logic for Users
 */
@Controller('users')
export class UsersController {

    /**
     * Injecting Users Service
     * @param usersService 
     */
    constructor(
        private readonly usersService: UsersService,
    ){}
    
    /**
     * The route to get users on the application
     * @param getUsersParamsDto 
     * @param limit 
     * @param page 
     * @returns 
     */
    @Get('{/:id/}')
    @ApiOperation({
        summary: "Fetches a list of registered users on the application"
    })
    @ApiResponse({
        status: 200,
        description:"Users fetched sucessfully based on the query",
    })
    @ApiQuery({
        name:'limit',
        type:'number',
        required: false,
        description: 'The number of entries returned per query',
        example: 10,
    })
    @ApiQuery({
        name:'page',
        type:'number',
        required: false,
        description: 'The position of the page number that you want the API to return',
        example: 1,
    })
    public getUsers(
        @Param() getUsersParamsDto: GetUsersParamDto, 
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    ){
        return this.usersService.findAll(getUsersParamsDto, limit, page);
    }


    /**
     * The route to create a new user
     * @param createUserDto 
     * @returns 
     */
    @Post()
    @Auth(AuthType.Bearer, AuthType.None) //allowing users to access this path wihtout a token
    public createUsers(
        @Body() createUserDto: CreateUserDto, 
    ){
        return this.usersService.createUser(createUserDto);
    }

    @Post('create-many')
    public createManyUsers(
        @Body() createManyUsersDto: CreateManyUsersDto, 
    ){
        return this.usersService.createMany(createManyUsersDto);
    }

    /**
     * The route to update a user
     * @param patchUserDto 
     * @returns 
     */
    @Patch()
    public patchUser(
        @Body() patchUserDto: PatchUserDto
    ){
        return patchUserDto;
    }
}
