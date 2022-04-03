
export interface Book {
  bookId?: string;
  title: string;
  author: string;
  ISBN: string;
  myRating: string;
  averageRating: string;
  publisher: string;
  binding: string;
  numberOfPages?: number;
  yearPublished: string;
  originalPublicationYear: string;
  dateRead: string;
  dateAdded: string;
  bookshelves: string;
  myReview: string;
  progress?: number;
}

export interface Shelf {
  name: string;
  totalCount: number;
  books: Book[];
}

export interface ExclusiveShelf extends Shelf {
  otherShelves: Shelf[];
}
export interface ExclusiveShelves {
  toRead: ExclusiveShelf;
  currentlyReading: ExclusiveShelf;
  read: ExclusiveShelf;
}

export interface Shelves {
  toRead: Book[];
  currentlyReading: Book[];
  read: Book[];
}

export interface ReadilyBookState {
  shelves: {
    exclusiveShelves: ExclusiveShelves,
    others: Shelf[];
  };
  all: Book[];
  totalPagesRead: number;
  loading: boolean;
  avgPageReading: number;
}
