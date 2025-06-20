import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

/**
 * Class to update user properties
 */
export class PatchUserDto extends PartialType(CreateUserDto){}