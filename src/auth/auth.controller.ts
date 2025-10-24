import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './provider/auth.service';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {

    constructor(
        //Injecting Auth Service
        private readonly authService: AuthService,
    ){}


    @Post('sign-in')
    @HttpCode(HttpStatus.OK) //custom response code
    public async signIn(@Body() signInDto: SignInDto){
        return this.authService.signIn(signInDto);
    }
}
