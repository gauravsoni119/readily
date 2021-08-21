import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from '@readily/data';
import { Model } from 'mongoose';
import { BooksClientService } from '../books/books-client/books-client.service';
import { BookDto } from '../books/dto/book.dto';
import { ShelfDto } from './dto/shelf.dto';
import { Shelf } from './interfaces/shelf.interface';

@Injectable()
export class ShelvesService {
  constructor(
    @InjectModel('Shelve') private readonly shelfModel: Model<Shelf>,
    private readonly bookClientService: BooksClientService
  ) {}

  async findAll(): Promise<Shelf[]> {
    return this.shelfModel.find().exec();
  }

  async create(shelfDto: ShelfDto): Promise<Shelf> {
    const books: BookDto[] = await this.getBooks(shelfDto);
    const newShelf = new this.shelfModel({ ...shelfDto, books });
    return newShelf.save();
  }

  async findShelfById(id: string): Promise<Shelf> {
    const shelf = await this.shelfModel.findById(id);
    if (!shelf) {
      throw new NotFoundException(`Shelf with id ${id} not found`);
    }
    return shelf;
  }

  async update(shelf: Shelf, shelfDto: ShelfDto): Promise<Shelf> {
    let books: BookDto[] = [];
    if (!this.findBookById(shelf, shelfDto.bookId)) {
      books = await this.getBooks(shelfDto);
    }
    shelf.set({
      title: shelfDto.title,
      description: shelfDto.description,
      books: [...shelf.books, ...books],
    });
    return shelf.save();
  }

  private findBookById(shelf: Shelf, bookId = ''): Book | undefined {
    return shelf.books.find((book) => book.id === bookId);
  }

  private async getBooks(shelfDto: ShelfDto): Promise<BookDto[]> {
    const books: BookDto[] = [];
    if (shelfDto.bookId) {
      const [bookVolume, error] = await this.bookClientService.getBook(
        shelfDto.bookId
      );
      if (error) {
        throw new BadRequestException({ message: 'Id is invalid' });
      }
      books.push(new BookDto(bookVolume));
    }
    return books;
  }
}
