export interface Book {
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
  id: string;
}

export interface Shelf {
  title: string;
  id: string;
  description?: string;
  books: Book[];
}
