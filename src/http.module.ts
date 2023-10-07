import { Module, DynamicModule } from '@nestjs/common';
import { HttpService } from './http.service';

@Module({})
export class HttpModule {
  static forRoot(urls: { name: string; value: string }[]): DynamicModule {
    const httpService = new HttpService(urls);
    return {
      module: HttpModule,
      providers: [
        {
          provide: HttpService,
          useValue: httpService,
        },
      ],
      exports: [HttpService],
    };
  }
}
