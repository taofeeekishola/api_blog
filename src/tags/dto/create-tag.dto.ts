import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsJSON, isJSON, IsNotEmpty, IsOptional, isString, IsString, IsUrl, Matches, MaxLength, MinLength } from "class-validator";

export class CraeteTagDto{

    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(256)
    @IsNotEmpty()
    name: string;

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

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsJSON()
    schmea?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUrl()
    @MaxLength(1024)
    featuredImageUrl?: string;
}