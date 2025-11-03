import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { UsersService } from 'src/users/providers/users.services';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

/**
 * class to generate fresh access and refresh tokens using the current refresh token
 */
@Injectable()
export class RefreshTokensProvider {

    constructor(
        /**
         * Inject jwtService
         */
        private readonly jwtService: JwtService,

        /**
        * Inject jwtConfiguration
        */
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

         /**
         * inject generateTokensProvider
         */
        private readonly generateTokensProvider: GenerateTokensProvider,

        /**
         * Inject userService
         */
        @Inject(forwardRef(() => UsersService))
        private readonly userService: UsersService,
    ){}


    /**
     * method to get new access and refresh token
     * @param refreshTokenDto 
     */
    public async refreshTokens(refreshTokenDto: RefreshTokenDto){
        try{
            //verify the refresh token using jwtService
            const {sub} = await this.jwtService.verifyAsync<Pick <ActiveUserData, 'sub'>>(
                refreshTokenDto.refreshtoken,
                {
                    secret: this.jwtConfiguration.secret,
                    audience: this.jwtConfiguration.audience,
                    issuer: this.jwtConfiguration.issuer
                });
                //fetch the user from the database
                const user = await this.userService.findOnebyId(sub);

                //generate the tokens
                return await this.generateTokensProvider.generateTokens(user);

        } catch(error){
            throw new UnauthorizedException(error);
        }
    }
}
