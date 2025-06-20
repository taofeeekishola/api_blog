import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

/**
 * Class to create a user
 */
export class CreateUserDto {

    /**
     * ensuring the firstname is optional and has a min and max length
     */
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(96)
    firstName: string;

    /**
     * ensuring the lastname is optional and has a min and max length
     */
    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(96)
    lastName: string;

    /**
     * validating the email 
     */
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(96)
    email: string;

    /**
     * ensuring the password is a specific formart using regualr expression
     */
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Minimum eight characters, at least one letter, one number and one special character',
    })
    @MaxLength(96)
    password: string;
}