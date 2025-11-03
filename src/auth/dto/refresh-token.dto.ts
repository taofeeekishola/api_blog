import { IsNotEmpty, IsString } from "class-validator";

/**
 * dto for refresh token
 */
export class RefreshTokenDto {
    @IsNotEmpty()
    @IsString()
    refreshtoken: string;
}