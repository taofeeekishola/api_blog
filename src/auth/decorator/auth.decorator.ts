import { AuthType } from '../enums/auth-type.enum';
import { AUTH_TYPE_KEY } from '../constants/auth.constants';
import { SetMetadata } from '@nestjs/common';

/**
 * creating a decorator to accepts the authtypes we want to pass in our controllers
 * @param authTypes 
 * @returns 
 */
export const Auth = (...authTypes: AuthType[]) => 
    SetMetadata(AUTH_TYPE_KEY, authTypes);
