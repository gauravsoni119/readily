import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { BooksClientService } from './books-client/books-client.service';
import { BooksClientMockFactory } from '../shared/mocks/books-client.service.stub';
import { BooksService } from './books.service';

describe('BooksService', () => {
  let service: BooksService;
  let module: TestingModule;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        BooksService,
        { provide: BooksClientService, useFactory: BooksClientMockFactory },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should findAll books matched for the query', async () => {
    const books = await service.findAll('');
    const expected = ['Black Hat Python', 'Python Crash Course'];
    expect(books.length).toEqual(2);
    books.forEach((book, index) => {
      expect(book.title).toEqual(expected[index]);
    });
  });
  it('should throw error if searchBooks throws error', async () => {
    const booksClientService = module.get<BooksClientService>(
      BooksClientService
    );
    jest
      .spyOn(booksClientService, 'searchBooks')
      .mockImplementation(async () => [null, new Error('test')]);
    const book = async () => await service.findAll('');
    await expect(book).rejects.toThrow('Internal Server Error');
  });
  it('should find and return book with given volumeId', async () => {
    const book = await service.findOne('123');
    expect(book.title).toEqual('Black Hat Python');
  });
  it('should throw error if book with given volumeId not found', async () => {
    const booksClientService = module.get<BooksClientService>(
      BooksClientService
    );
    jest
      .spyOn(booksClientService, 'getBook')
      .mockImplementation(async () => [null, new Error('test')]);
    const book = async () => await service.findOne('123');
    await expect(book).rejects.toThrow('No book found for id 123');
  });
});
