import { ConfigModule } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { BooksClientService } from '../books/books-client/books-client.service';
import { BooksClientMockFactory } from '../shared/mocks/books-client.service.stub';
import { ShelvesController } from './shelves.controller';
import { ShelvesService } from './shelves.service';

describe('ShelvesController', () => {
  let controller: ShelvesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [ShelvesController],
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

    controller = module.get<ShelvesController>(ShelvesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
