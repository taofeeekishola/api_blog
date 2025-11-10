import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constants';


@Injectable()
export class AuthenticationGuard implements CanActivate {
  //setting a default auth type
  private static readonly defaultAuthType = AuthType.Bearer;

  //getting the map of all authentication types
  //assigning a guard to all the authentication type
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

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    //get all the authTypes from reflector\
    const authTypes = this.reflector.getAllAndOverride(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()]
    ) ?? [AuthenticationGuard.defaultAuthType];

    //show authTYPES
    // console.log(authTypes);

    //create array of guards
    const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();

    // console.log(guards);

    //default error
    const error = new UnauthorizedException();

    //loop through guards canActivate
    for (const instance of guards){
      // console.log(instance)
      const canActicate = await Promise.resolve(
        instance.canActivate(context)
      ).catch((err) =>{
        error: err;
      });
      // console.log(canActicate)
      if(canActicate){
        return true;
      }
    }

    throw error;
  }
}
