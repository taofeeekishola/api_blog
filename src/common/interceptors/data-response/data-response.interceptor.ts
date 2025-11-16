import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, tap, map } from 'rxjs';

/**
 * this class adds the api version to the response 
 */
@Injectable()
export class DataResponseInterceptor implements NestInterceptor {

  constructor(
    /**
     * inject configService
     */
    private readonly configService: ConfigService,
  ){}

  /**
   * this retruns the respone with the api version and response in a data object
   * @param context 
   * @param next 
   * @returns 
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    
    return next.handle().pipe(map((data)=>({
      apiVersion: this.configService.get('appConfig.apiVersion'),
      data: data,
    })));
  }
}
