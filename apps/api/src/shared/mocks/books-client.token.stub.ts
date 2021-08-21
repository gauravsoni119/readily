import { BOOKS } from './books-client.service.stub';

export const googleApiBookStubFactory = jest.fn(() => ({
  volumes: {
    list: jest.fn(() => ({
      config: {},
      data: { items: BOOKS },
      status: 200,
      statusText: 'OK',
      headers: {},
      request: { responseURL: '' },
    })),
    get: jest.fn(({ volumeId }) => ({
      config: {},
      data: BOOKS.find((book) => book.id === volumeId),
      status: 200,
      statusText: 'OK',
      headers: {},
      request: { responseURL: '' },
    })),
  },
}));
