import { ConfigModule } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { BooksClientService } from '../books/books-client/books-client.service';
import { BooksClientMockFactory } from '../shared/mocks/books-client.service.stub';
import { ShelvesService } from './shelves.service';

describe('ShelvesService', () => {
  let service: ShelvesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        ShelvesService,
        { provide: BooksClientService, useFactory: BooksClientMockFactory },
        {
          provide: getModelToken('Shelve'),
          useValue: {
            find() {
              return { exec: () => ({}) };
            },
          },
        },
      ],
    }).compile();

    service = module.get<ShelvesService>(ShelvesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
