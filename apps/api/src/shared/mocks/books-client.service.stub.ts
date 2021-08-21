export const BOOKS = [
  {
    id: '123',
    volumeInfo: {
      title: 'Black Hat Python',
      authors: ['Justin Seitz'],
      description: 'test',
      pageCount: 300,
      averageRating: 3,
      ratingsCount: 20,
    },
  },
  {
    id: '456',
    volumeInfo: {
      title: 'Python Crash Course',
      authors: ['Eric Matthes'],
      description: 'test',
      pageCount: 260,
      averageRating: 4,
      ratingsCount: 10,
    },
  },
];

export const BooksClientMockFactory = jest.fn(() => ({
  searchBooks: jest.fn(() => [BOOKS, null]),
  getBook: jest.fn((volumeId) => [
    BOOKS.find((book) => book.id === volumeId),
    null,
  ]),
}));
