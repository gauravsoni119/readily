import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { googleApiBookStubFactory } from '../../shared/mocks/books-client.token.stub';
import { BooksClientService } from './books-client.service';

describe('BooksClientService', () => {
  let service: BooksClientService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        {
          provide: 'GOOGLE_APIS_BOOKS_CLIENT',
          useFactory: googleApiBookStubFactory,
        },
        BooksClientService,
      ],
    }).compile();

    service = module.get<BooksClientService>(BooksClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return list of books that matched the query', async () => {
    const books = await service.searchBooks('');
    expect(books.length).toEqual(2);
  });
  it('should return error if googleapis throw error', async () => {
    const googleApisBooks = module.get('GOOGLE_APIS_BOOKS_CLIENT');
    const expectedError = 'something went wrong!';
    spyOn(googleApisBooks.volumes, 'list').and.throwError(expectedError);
    const [books, error] = await service.searchBooks('');
    expect(books).toBeNull();
    expect(error.message).toEqual(expectedError);
  });
  it('should return books that matched the given id', async () => {
    const [book, error] = await service.getBook('123');
    expect(book.volumeInfo.title).toEqual('Black Hat Python');
    expect(error).toBeNull();
  });
  it('should return error if googleapis throw error', async () => {
    const googleApisBooks = module.get('GOOGLE_APIS_BOOKS_CLIENT');
    const expectedError = 'something went wrong!';
    spyOn(googleApisBooks.volumes, 'get').and.throwError(expectedError);
    const [books, error] = await service.getBook('');
    expect(books).toBeNull();
    expect(error.message).toEqual(expectedError);
  });
});
