# How to use

You must import it into your module and enter the name and value of your base url as configuration. It will create the client instance for your bases url (Currently it only has the axios client)

## Example

In the module I must import the `HttpModule` and configure the clients, example of use:

```ts
import { Module } from '@nestjs/common';

import { HttpModule } from 'nestjs-http-package';

import { HttpCompanyRepository } from '../infra';
import { CompanyRepositoryToken } from '../domain';

@Module({
  imports: [
    HttpModule.forRoot([
      { name: 'brasilApi', value: 'https://brasilapi.com.br/api/cnpj/v1' },
      { name: 'viaCep', value: 'https://viacep.com.br/ws' },
    ]),
  ],
  providers: [
    HttpCompanyRepository,
    {
      provide: CompanyRepositoryToken,
      useExisting: HttpCompanyRepository,
    },
  ],
  exports: [CompanyRepositoryToken],
})
export class HttpCompanyInfraModule {}
```

I generated two clients, one pointing to BrasilApi and the other to ViaCep. One to search for information about a Brazilian company, and another to search for address information based on zip code.

In my repository, I need to inject the `HttpService` and use it normally:

```ts
import { Inject, Injectable } from '@nestjs/common';

import { HttpService } from 'nestjs-http-package';

import { CompanyEntity, CompanyRepository } from '@/company/domain';

@Injectable()
export class HttpCompanyRepository implements CompanyRepository {
  constructor(@Inject(HttpService) private readonly httpService: HttpService) {}

  async findCompany(document: string): Promise<any> {
    try {
      const client = this.httpService.getClient('brasilApi');
      const response = await client.get(`/${document}`);

      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAddress(cep: string): Promise<any> {
    try {
      const client = this.httpService.getClient('viaCep');
      const response = await client.get(`/${cep}/json`);

      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}
```

In the `findCompany` method, you searched for the client configured for `brasilApi` and in the `findAddress` method, you searched for the client configured for `viaCep`, making your respective requests.
