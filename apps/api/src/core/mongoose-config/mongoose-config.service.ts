import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    const user = this.configService.get<string>('DATABASE_USER');
    const password = this.configService.get<string>('DATABASE_PASSWORD');
    const host = this.configService.get<string>('DATABASE_HOST');
    const name = this.configService.get<string>('DATABASE_NAME');
    const params = this.configService.get<string>('DATABASE_CONNECTION_PARAMS');
    return {
      uri: `mongodb+srv://${user}:${password}@${host}/${name}?${params}`,
      useNewUrlParser: true,
    };
  }
}
