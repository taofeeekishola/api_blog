import { IsInt, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";

/**
 * Class for validating the id passed by the user
 */
export class GetUsersParamDto{

    /**
     * validating the id passed by the user
     */
    @ApiPropertyOptional({
        description: "Get user with a specific id",
        example: 1234,
    })
    @IsOptional()
    @IsInt()
    @Type(()=> Number)
    id?: number;
}