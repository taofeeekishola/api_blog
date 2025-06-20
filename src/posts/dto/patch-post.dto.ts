import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreatePostDto } from "./create-post.dto";

/**
 * Class to update a post
 */
export class PatchPostDto extends PartialType(CreatePostDto){

    /**
     * Validating the id of a post when updating a post
     */
    @ApiProperty({
        description: 'The ID of the post that needs to be updated'
    })
    @IsInt()
    @IsNotEmpty()
    id: number;
}