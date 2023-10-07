import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class HttpService {
  private readonly httpClients: { [key: string]: AxiosInstance } = {};

  constructor(private readonly urls: { name: string; value: string }[]) {
    urls.forEach((url) => {
      this.httpClients[url.name] = axios.create({
        baseURL: url.value,
      });
    });
  }

  getClient(name: string = this.urls[0].name): AxiosInstance {
    if (!this.httpClients[name]) {
      throw new Error(`Base URL ${name} not configured.`);
    }
    return this.httpClients[name];
  }
}
