import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ReadilyBookState } from '@readily/shared/data-access/models';

@Injectable({ providedIn: 'root' })
export class BooksStore extends ComponentStore<ReadilyBookState> {
  vm$ = this.select(({ all, shelves, totalPagesRead, avgPageReading, loading }) => ({
    all,
    loading,
    shelves,
    totalPagesRead,
    avgPageReading,
    readBookSeries: shelves.others.map((shelf) => ({
      name: shelf.name,
      value: shelf.totalCount,
    })),
    autoCompleteBooks: all.map((book) => ({
      id: book.bookId ?? book.ISBN,
      name: book.title,
    })),
  }));
  constructor() {
    super({
      loading: false,
      file: undefined,
      totalPagesRead: 0,
      avgPageReading: 0,
      shelves: {
        exclusiveShelves: {
          toRead: {
            name: 'toRead',
            totalCount: 0,
            books: [],
            otherShelves: [],
          },
          currentlyReading: {
            name: 'currentlyReading',
            totalCount: 0,
            books: [],
            otherShelves: [],
          },
          read: { name: 'read', totalCount: 0, books: [], otherShelves: [] },
        },
        others: [],
      },
      all: [],
    });
  }

  readonly loadBooks = this.updater(
    (
      state,
      newState: Pick<ReadilyBookState, 'all' | 'shelves' | 'totalPagesRead'>
    ) => ({
      ...state,
      all: newState.all,
      shelves: newState.shelves,
      loading: false,
      totalPagesRead: newState.totalPagesRead,
      avgPageReading: this.calcAvgPageReading(newState.totalPagesRead),
    })
  );

  addFile(file: File) {
    this.patchState({ loading: true, file });
  }

  private calcAvgPageReading(totalPagesRead: number) {
    return Math.ceil(totalPagesRead / 365);
  }
}
