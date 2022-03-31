/// <reference lib="webworker" />

import { ExclusiveShelves, Shelf } from "@readily/shared/data-access/models";

interface ReadilyDataBase {
  shelves: {
    exclusiveShelves: ExclusiveShelves,
    others: Shelf[];
  };
  all: unknown[];
  totalPagesRead: number;
}

const EXCLUSIVE_SHELVES = {
  'to-read': 'toRead',
  'currently-reading': 'currentlyReading',
  'read': 'read',
} as const;

const headerMap = {
  'Title': 'title',
  'Author': 'author',
  'My Rating': 'myRating',
  'Average Rating': 'averageRating',
  'Publisher': 'publisher',
  'Binding': 'binding',
  'Year Published': 'yearPublished',
  'Original Publication Year': 'originalPublicationYear',
  'Date Read': 'dateRead',
  'Date Added': 'dateAdded',
  'Bookshelves': 'bookshelves',
  'My Review': 'myReview',
  'Number of Pages': 'numberOfPages',
  'ISBN': 'ISBN',
  'Exclusive Shelf': 'exclusiveShelves',
} as const;

const defaultDb: ReadilyDataBase = {
  shelves: {
    exclusiveShelves: {
      toRead: { name: 'toRead', totalCount: 0, books: [], otherShelves: [] },
      currentlyReading: { name: 'currentlyReading', totalCount: 0, books: [], otherShelves: [] },
      read: { name: 'read', totalCount: 0, books: [], otherShelves: [] }
    },
    others: [],
  },
  all: [],
  totalPagesRead: 0,
};

addEventListener('message', ({ data }) => {
  const response = csvJSON(data);
  const normalizedData = response.reduce((db: ReadilyDataBase, res) => {
    if (res['exclusiveShelves']) {
      updateExclusiveShelf(res, db);
    }
    if (res['bookshelves']) {
      const shelves = filterNonExclusiveShelf(res['bookshelves'] as string);
      const exclusiveShelfName = getExclusiveShelfName(res['bookshelves'] as string);
      shelves.forEach(shelf => {
        const otherShelf = db.shelves.others.find(existingShelf => existingShelf.name === shelf);
        if (otherShelf) {
          otherShelf.books.push(res);
          ++otherShelf.totalCount;
        } else {
          db.shelves.others.push({ name: shelf, totalCount: 1, books: [res] });
        }
        if (exclusiveShelfName) {
          const existOtherShelf = db.shelves.exclusiveShelves[exclusiveShelfName].otherShelves.find(exclusiveOtherShelf => {
            return exclusiveOtherShelf.name === shelf;
          });
          if (existOtherShelf) {
            existOtherShelf.books.push(res);
            ++existOtherShelf.totalCount;
          } else {
            db.shelves.exclusiveShelves[exclusiveShelfName].otherShelves.push({ name: shelf, totalCount: 1, books: [res] });
          }
        }
      });

    }
    // remove extra chars from ISBN while parsing to JSON
    res['ISBN'] = res['ISBN'].replace(/\D+/g, '');
    db.all.push(res);
    return db;
  }, { ...defaultDb });
  postMessage(normalizedData);
});

function csvJSON(csv: string) {
  const lines = csv.split("\n");
  const result = [];
  const headers = lines[0].split(",").map(header => headerMap[header.trim()]);

  for (let i = 1; i < lines.length; i++) {
    const obj: Record<string, unknown> = {};

    const row = lines[i];
    let startValueIdx = 0;
    let queryIdx = 0;
    let idx = 0;

    if (row.trim() === '') { continue; }

    while (idx < row.length) {
      /* if we meet a double quote we skip until the next one */
      let c = row[idx];

      if (c === '"') {
        do { c = row[++idx]; } while (c !== '"' && idx < row.length - 1);
      }

      if (c === ',' || /* handle end of line with no comma */ idx === row.length - 1) {
        /* we've got a value */
        let value = row.substr(startValueIdx, idx - startValueIdx).trim();

        /* skip first double quote */
        if (value[0] === '"') { value = value.substr(1); }
        /* skip last comma */
        if (value[value.length - 1] === ',') { value = value.substr(0, value.length - 1); }
        /* skip last double quote */
        if (value[value.length - 1] === '"') { value = value.substr(0, value.length - 1); }

        const key = headers[queryIdx++];
        obj[key] = value;
        startValueIdx = idx + 1;
      }

      ++idx;
    }

    result.push(obj);
  }
  return result;
}

const updateExclusiveShelf: (res: any, db: ReadilyDataBase) => void = (res, db) => {
  const shelfName: keyof typeof EXCLUSIVE_SHELVES = res['exclusiveShelves'];
  const exclusiveShelf = db.shelves.exclusiveShelves[EXCLUSIVE_SHELVES[shelfName]];
  exclusiveShelf.books.push(res);
  ++exclusiveShelf.totalCount;
  db.totalPagesRead += shelfName === 'to-read' ? (parseInt(res.numberOfPages, 10) || 0) : 0;
};

const filterNonExclusiveShelf: (shelves: string) => string[] = (shelves) => {
  return shelves
    .split(',')
    .map(shelf => shelf.trim())
    .filter(shelf => !Object.keys(EXCLUSIVE_SHELVES).includes(shelf))
}

const getExclusiveShelfName = (shelves: string): keyof ExclusiveShelves | undefined => {
  const shelfName = shelves
    .split(',')
    .map(shelf => shelf.trim())
    .find(shelf => !!EXCLUSIVE_SHELVES[shelf]);
  return shelfName ? (EXCLUSIVE_SHELVES[shelfName]) : undefined;
}
