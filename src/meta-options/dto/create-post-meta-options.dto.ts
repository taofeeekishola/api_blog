import { IsJSON, IsNotEmpty } from "class-validator";

/**
 * Class to craete a nested dto
 */
export class CreatePostMetaOptionsDto{

    @IsNotEmpty()
    @IsJSON()
    metaValue: string;
}