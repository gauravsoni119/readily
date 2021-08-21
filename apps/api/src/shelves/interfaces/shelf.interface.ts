import { Book } from '@readily/data';
import { Document, Model } from 'mongoose';

export interface ShelfAttrs {
  title: string;
  description: string;
  books: Book[];
}

export interface Shelf extends Document {
  title: string;
  description: string;
  books: Book[];
}

export interface ShelfModel extends Model<Shelf> {
  build(attrs: ShelfAttrs): Shelf;
}
