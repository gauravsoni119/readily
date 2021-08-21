import { Shelf } from '@readily/data';
import * as mongoose from 'mongoose';

export const ShelfSchema = new mongoose.Schema<Shelf>(
  {
    title: String,
    description: String,
    books: [
      {
        title: String,
        author: [String],
        description: String,
        imageLinks: new mongoose.Schema({
          extraLarge: String,
          large: String,
          medium: String,
          small: String,
          smallThumbnail: String,
          thumbnail: String,
        }),
        pageCount: Number,
        avgRating: Number,
        ratingCount: Number,
        id: String,
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);
