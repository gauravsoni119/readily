import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '../shared/shared.module';
import { BooksClientService } from './books-client/books-client.service';
import { googleApiBookFactory } from './books-client/books-client.token';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [SharedModule, ConfigModule],
  controllers: [BooksController],
  providers: [BooksService, googleApiBookFactory, BooksClientService],
  exports: [BooksClientService],
})
export class BooksModule {}
