import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';

interface DatabaseConfig {
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_HOST: string;
  DATABASE_NAME: string;
}

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (configService: ConfigService<DatabaseConfig>): Promise<typeof mongoose> => {
      const user = configService.get<string>('DATABASE_USER');
      const password = configService.get<string>('DATABASE_PASSWORD');
      const host = configService.get<string>('DATABASE_HOST');
      const name = configService.get<string>('DATABASE_NAME');
      return mongoose.connect(`
      mongodb+srv://${user}:${password}@${host}/${name}?retryWrites=true&w=majority
      `, {useNewUrlParser: true});
    },
    inject: [ConfigService]
  },
];
