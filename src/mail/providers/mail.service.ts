import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';

@Injectable()
export class MailService {
    constructor(
        /**
         * inject mailerService
         */
        private readonly mailerService: MailerService,
    ){}

    public async senduserWelcome(user: User): Promise<void>{
        await this.mailerService.sendMail({
            to: user.email,
            from: `OnBoarding Team <support@nestjs-blog.com>`,
            subject: 'Welcome to NestJsBlog',
            template: './welcome',
            context: {
                name: user.firstName,
                email: user.email,
                loginUrl: 'http://localhost:3000',
            },
        });
    }
}
