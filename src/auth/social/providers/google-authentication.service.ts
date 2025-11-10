import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UsersService } from 'src/users/providers/users.services';
import { GenerateTokensProvider } from 'src/auth/provider/generate-tokens.provider';

/**
 * method to verify the token from google
 */
@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
    private oauthClient: OAuth2Client;

    constructor(
        /**
         * inject usersService
         */
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,

        /**
         * inject jwtConfig
         */
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

        /**
         * inject generateTokensProvider
         */
        private readonly generateTokensProvider: GenerateTokensProvider,
    ){}

    //this method is invoked the moment the module is instanciated
    onModuleInit() {
        const clientId = this.jwtConfiguration.googleClientId;
        const clientSecret =  this.jwtConfiguration.googleClientSecret;

        this.oauthClient = new OAuth2Client(clientId, clientSecret);
    }

    /**
     * method to validate the token
     * @param googleTokenDto 
     */
    public async authenticate(googleTokenDto: GoogleTokenDto){
        //verify the google token by user
        const loginTicket = await this.oauthClient.verifyIdToken({
            idToken: googleTokenDto.token,
        });

        // Get payload safely
        const payload = loginTicket.getPayload();
        if (!payload) {
        throw new Error('Invalid Google token payload');
        }

        //extract the payload from google jwt
        const {email, sub:googleId} = payload;

        //find the user in the database using the googleId
        const user = await this.usersService.findOneByGoogleId(googleId);

        // if googleId exists generate token
        if(user){
            return this.generateTokensProvider.generateTokens(user);
        }
        //if not create a new user and then generate tokens
        //throw Unauthrized exception
    }
}
