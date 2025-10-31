import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import jwtConfig from 'src/auth/config/jwt.config';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';

/**
 * Guard to check and validate the access token in the header
 */
@Injectable()
export class AccessTokenGuard implements CanActivate {
 
  constructor(
    /**
     * inject jwtService
     */
    private readonly jwtService: JwtService,

    /**
     * inject jwt configuration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    //Extract the requet from the execution context
    const request = context.switchToHttp().getRequest();

    //Extract the token from the header
    const token = this.extractRequestFromHeader(request);

    //Validate the token
    if(!token){
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );

      //adding the payload to the request body to use the id and email to get the user from the database with each request
      request [REQUEST_USER_KEY] = payload;
    } catch{
      throw new UnauthorizedException();
    }

    return true;
  }

  /**
   * method to extract token from the request
   * @param request 
   */
  private extractRequestFromHeader(request: Request): string | undefined{

    //destructuring to extract the token
    //using the empty space between beaer and token to extract the token
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}
