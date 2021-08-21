import { Inject, Injectable } from '@nestjs/common';
import { books_v1 } from '@googleapis/books';

@Injectable()
export class BooksClientService {
  constructor(
    @Inject('GOOGLE_APIS_BOOKS_CLIENT')
    private readonly booksClient: books_v1.Books
  ) {}
  async searchBooks(
    q: string
  ): Promise<[books_v1.Schema$Volume[], null | Error]> {
    try {
      const response = await this.booksClient.volumes.list({ q });
      return [response.data.items, null];
    } catch (error) {
      return [null, error];
    }
  }
  async getBook(
    volumeId: string
  ): Promise<[books_v1.Schema$Volume, null | Error]> {
    try {
      const response = await this.booksClient.volumes.get({ volumeId });
      return [response.data, null];
    } catch (error) {
      return [null, error];
    }
  }
}
