import { IsArray, IsDate, IsEnum, IsIn, IsInt, IsISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MaxLength, maxLength, MinLength, ValidateNested } from "class-validator";
import { postType } from "../enums/postType.enum";
import { postStatus } from "../enums/postStatus.enum";
import { CreatePostMetaOptionsDto } from "../../meta-options/dto/create-post-meta-options.dto";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";


/**
 * Class to create a post
 */
export class CreatePostDto{
    
    /**
     * validating the title
     */
    @ApiProperty({
        example:"This is a title",
        description:'This is the title of the blog'
    })
    @IsString()
    @MinLength(4)
    @MaxLength(512)
    @IsNotEmpty()
    title: string;

    /**
     * ensuring post type is an enum
     */
    @ApiProperty({
        enum:postType,
        description: "Possible values, 'post', 'page','story','series'"
    })
    @IsEnum(postType)
    @IsNotEmpty()
    postType:postType;

    /**
     * validating slug property
     */
    @ApiProperty({
        description:"For example - 'my-url'",
        example: 'my-blog-post'
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message:'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"'
    })
    @MaxLength(256)
    slug: string;


    /**
     * ensuring status is an enum
     */
    @ApiProperty({
        enum:postStatus,
        description: "Possible values 'draft','scheduled','review','published'"
    })
    @IsEnum(postStatus)
    @IsNotEmpty()
    status:postStatus;


    /**
     * validating the content property and making it optional
     */
    @ApiPropertyOptional({
        description: "This is the content of the post"
    })
    @IsString()
    @IsOptional()
    content?: string


    /**
     * validating the schema property to ensure it takes only serialised json
     */
    @ApiPropertyOptional({
        description:"Serialise your JSON else a validation error will be thrown",
        example: "{\r\n \"@context\": \"https:\/\/schema.org\",\r\n \"@type\": \"Person\"\r\n }"
    })
    @IsString()
    @IsJSON()
    @IsOptional()
    schema?: string;

    /**
     * valiating featuredimageurl property
     */
    @ApiPropertyOptional({
        description:"Featured image for your blog post",
        example:"http://localhost.com/images/image1.jpg"
    })
    @IsOptional()
    @IsUrl()
    @MaxLength(1024)
    featuredImageUrl?: string;


    /**
     * validating the date property
     */
    @ApiPropertyOptional({
        description:"The date the blog post was posted",
        example: "2024-03-16T07:46:32+0000"
    })
    @IsISO8601()
    @IsOptional()
    publishOn?: Date;


    /**
     * validating tags property to accept an array of strings
     */
    @ApiPropertyOptional({
        description:"Array of ids of tags",
        example:[1,2]
    })
    @IsOptional()
    @IsArray()
    @IsInt({each: true})
    tags?: number[];


    /**
     * accepts the nested dto and validates it 
     */
    @ApiPropertyOptional({
    type: () => CreatePostMetaOptionsDto,
    description: 'Meta options for the post',
    })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreatePostMetaOptionsDto)
    metaOptions?: CreatePostMetaOptionsDto | null;

    /**
     * validating autherid property
     */
    @ApiProperty({
        type:'integer',
        required: true,
        example: 1,
    })
    @IsNotEmpty()
    @IsInt()
    authorId: number;
}