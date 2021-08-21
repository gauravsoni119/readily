import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import {
  BOOKS,
  BooksClientMockFactory,
} from '../shared/mocks/books-client.service.stub';
import { BooksClientService } from './books-client/books-client.service';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';

describe('BooksController', () => {
  let controller: BooksController;
  let bookService: BooksService;
  const booksDto = BOOKS.map((book) => new BookDto({ ...book }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [BooksController],
      providers: [
        BooksService,
        { provide: BooksClientService, useFactory: BooksClientMockFactory },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    bookService = module.get<BooksService>(BooksService);
  });

  it('should return list of books', async () => {
    jest.spyOn(bookService, 'findAll').mockImplementation(async () => booksDto);
    expect(await controller.findAll('black')).toBe(booksDto);
  });

  it('should return given book', async () => {
    jest
      .spyOn(bookService, 'findOne')
      .mockImplementation(async () => booksDto[0]);
    expect(await controller.findOne('123')).toBe(booksDto[0]);
  });
});
