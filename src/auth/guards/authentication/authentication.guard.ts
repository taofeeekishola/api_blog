import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';


@Injectable()
export class AuthenticationGuard implements CanActivate {
  //setting a default auth type
  private static readonly defaultAuthType = AuthType.Bearer;

  //getting the map of all authentication types
  //asigning a guard to all the authentication type
  private readonly authTypeGuardMap : Record< AuthType, CanActivate | CanActivate[]>

  constructor(
    /**
     * inject reflector
     */
    private readonly reflector: Reflector,

    /**
     * inject accessTokenGuard
     */
    private readonly accessTokenGuard: AccessTokenGuard,
  ){
    this.authTypeGuardMap = {
      [AuthType.Bearer] : this.accessTokenGuard,
      [AuthType.None] : {
        canActivate : () => true,
      },
    };
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(this.authTypeGuardMap)
    return true;
  }
}
