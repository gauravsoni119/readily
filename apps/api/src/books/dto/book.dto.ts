import { books_v1 } from '@googleapis/books';
import { Book } from '@readily/data';

export class BookDto implements Book {
  readonly title: string;
  readonly authors: string[];
  readonly description?: string;
  readonly imageLinks?: {
    extraLarge?: string;
    large?: string;
    medium?: string;
    small?: string;
    smallThumbnail?: string;
    thumbnail?: string;
  };
  readonly pageCount?: number;
  readonly avgRating?: number;
  readonly ratingCount: number;
  shelf: string;
  id: string;
  constructor(book: books_v1.Schema$Volume) {
    this.id = book.id;
    this.title = book.volumeInfo.title;
    this.authors = book.volumeInfo.authors;
    this.description = book.volumeInfo.description;
    this.imageLinks = book.volumeInfo.imageLinks;
    this.pageCount = book.volumeInfo.pageCount;
    this.avgRating = book.volumeInfo.averageRating;
    this.ratingCount = book.volumeInfo.ratingsCount;
  }
}
