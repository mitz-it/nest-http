import { Module, DynamicModule } from '@nestjs/common';
import { HttpService } from './http.service';
import { CreateAxiosDefaults } from 'axios';
import { HttpClientFactory } from './http-factory.service';

@Module({})
export class HttpModule {
  static factory: HttpClientFactory;

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

  static register(
    configs: { name: string; config: CreateAxiosDefaults<any> }[],
  ): DynamicModule {
    const factory = new HttpClientFactory(configs);
    return {
      module: HttpModule,
      providers: [
        {
          provide: HttpClientFactory,
          useValue: factory,
        },
      ],
      exports: [HttpClientFactory],
    };
  }
}
