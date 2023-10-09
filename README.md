<h1 align="center">
     🐈 <a href="#" alt="">Nest Http</a>
</h1>

<h3 align="center">
  💉 Injecting multiple http clients into a module
</h3>

## Table of contents

<!--ts-->

- [Installation](#-installation)
- [How to use](#-how-to-use)
  - [Example](#example)
- [To Do](#-to-do)
- [License](#-license)

<!--te-->

## 💡Installation

`npm i @mitz-it/nest-http` or `yarn add @mitz-it/nest-http`

## 👨‍💻 How to use

You must import it into your module and enter the name and value of your base url as configuration. It will create the client instance for your bases url (Currently it only has the axios client)

### Example

In the module I must import the `HttpModule` and configure the clients, example of use:

```ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@mitz-it/nest-http';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    HttpModule.register([
      {
        name: 'brasilApi',
        config: {
          baseURL: 'https://brasilapi.com.br/api/cnpj/v1',
        },
      },
      {
        name: 'viaCep',
        config: {
          baseURL: 'https://viacep.com.br/ws',
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

I generated two clients, one pointing to BrasilApi and the other to ViaCep. One to search for information about a Brazilian company, and another to search for address information based on zip code.

In my repository, I need to inject the `HttpService` and use it normally:

```ts
import { Injectable } from '@nestjs/common';

import { HttpClientFactory } from '@mitz-it/nest-http';

@Injectable()
export class AppService {
  constructor(private readonly factory: HttpClientFactory) {}

  async findCompany(document: string): Promise<any> {
    try {
      const client = this.factory.createClient('brasilApi');
      const response = await client.get(`/${document}`);

      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAddress(cep: string): Promise<any> {
    try {
      const client = this.factory.createClient('viaCep');
      const response = await client.get(`/${cep}/json`);

      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}
```

In the `findCompany` method, you searched for the client configured for `brasilApi` and in the `findAddress` method, you searched for the client configured for `viaCep`, making your respective requests.

## 📑To Do

- [] Add tests
- [] Add examples
- [] Add multiple http clients (axios, fetch api...)

## 📝 License

This project is licensed [MIT](./LICENSE.md).
