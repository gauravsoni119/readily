/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  // const response = `worker response to ${data}`;
  const response = csvJSON(data);
  const normalizedData = response.reduce((db, res) => {
    if (res['Bookshelves'] !== undefined) {
      // remove extra chars from ISBN while parsing to JSON
      res['ISBN'] = res['ISBN'].replace(/\D+/g, '');
      if (res['Bookshelves'].includes('to-read')) {
        db.shelves.toRead.push(res);
      } else if (res['Bookshelves'].includes('currently-reading')) {
        db.shelves.currentlyReading.push(res);
      } else {
        db.shelves.read.push(res);
      }
    }
    db.all.push(res);
    return db;
  }, { shelves: { toRead: [], currentlyReading: [], read: [] }, all: [] });
  postMessage(normalizedData);
});

function csvJSON(csv: string) {
  const lines = csv.split("\n");
  const result = [];
  const headers = lines[0].split(",");

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
