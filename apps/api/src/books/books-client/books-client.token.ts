import { books } from '@googleapis/books';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const googleApiBookFactory: Provider = {
  provide: 'GOOGLE_APIS_BOOKS_CLIENT',
  useFactory: (config: ConfigService) =>
    books({
      auth: config.get<string>('GOOGLE_API_KEY'),
      version: 'v1',
    }),
  inject: [ConfigService],
};
