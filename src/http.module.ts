import { Module, DynamicModule } from '@nestjs/common';
import { CreateAxiosDefaults } from 'axios';
import { HttpClientFactory } from './http-factory.service';

@Module({})
export class HttpModule {
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
