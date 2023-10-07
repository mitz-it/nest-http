import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

@Injectable()
export class HttpClientFactory {
  private readonly clients: { [key: string]: AxiosInstance } = {};
  private readonly configs: {
    name: string;
    config: CreateAxiosDefaults<any>;
  }[] = [];

  constructor(configs: { name: string; config: CreateAxiosDefaults<any> }[]) {
    this.configs = configs;
  }

  createClient(name?: string): AxiosInstance {
    if (!name) {
      return axios.create();
    }

    const client = this.clients[name];
    const config = this.configs.find((c) => c.name === name)?.config ?? {};

    if (!client) {
      this.clients[name] = axios.create(config);
      return this.clients[name];
    }

    return client;
  }
}
