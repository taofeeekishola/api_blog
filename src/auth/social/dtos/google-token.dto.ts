import { IsNotEmpty } from "class-validator";

/**
 * the value we expect when a user tries to sign in/up using google
 */
export class GoogleTokenDto{
    @IsNotEmpty()
    token: string;
}