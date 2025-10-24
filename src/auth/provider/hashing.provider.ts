import { Injectable } from '@nestjs/common';

/**
 * An abstract class so it can be used everywhere
 */
@Injectable()
export abstract class HashingProvider {

    /**
     * method for hasting the password
     */
    abstract hashPassword(data: string | Buffer): Promise<string>;

    /**
     * method that compares the password at login to the hash in the database
     */
    abstract comparePassword( data: string | Buffer, encrypted: string,): Promise<boolean>;
}
