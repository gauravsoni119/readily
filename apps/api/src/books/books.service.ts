import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BooksClientService } from './books-client/books-client.service';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly booksClient: BooksClientService) {}

  async findAll(query: string): Promise<BookDto[]> {
    const [books, error] = await this.booksClient.searchBooks(query);
    if (error) {
      throw new InternalServerErrorException();
    }
    return books.map((book) => new BookDto(book));
  }

  async findOne(id: string): Promise<BookDto> {
    const [book, error] = await this.booksClient.getBook(id);
    if (!book || error) {
      throw new NotFoundException(`No book found for id ${id}`);
    }
    return new BookDto(book);
  }
}
