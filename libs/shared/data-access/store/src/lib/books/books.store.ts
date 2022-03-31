import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ReadilyBookState } from '@readily/shared/data-access/models';

@Injectable({ providedIn: 'root' })
export class BooksStore extends ComponentStore<ReadilyBookState> {
  vm$ = this.select(({ all, shelves, totalPagesRead, avgPageReading }) => ({
    all,
    shelves,
    totalPagesRead,
    avgPageReading,
    readBookSeries: shelves.others.map(shelf => ({ name: shelf.name, value: shelf.totalCount }))
  }));
  constructor() {
    super({
      loading: false,
      totalPagesRead: 0,
      avgPageReading: 0,
      shelves: {
        exclusiveShelves: {
          toRead: { name: 'toRead', totalCount: 0, books: [], otherShelves: [] },
          currentlyReading: { name: 'currentlyReading', totalCount: 0, books: [], otherShelves: [] },
          read: { name: 'read', totalCount: 0, books: [], otherShelves: [] }
        },
        others: [],
      },
      all: []
    });
  }

  updateLoading() {
    this.patchState({ loading: true });
  }

  readonly loadBooks = this.updater((state, newState: Pick<ReadilyBookState, 'all' | 'shelves' | 'totalPagesRead'>) => ({
    ...state,
    all: newState.all,
    shelves: newState.shelves,
    loading: false,
    totalPagesRead: newState.totalPagesRead,
    avgPageReading: this.calcAvgPageReading(newState.totalPagesRead)
  }));

  private calcAvgPageReading(totalPagesRead: number) {
    return Math.ceil(totalPagesRead / 365);
  }
}
