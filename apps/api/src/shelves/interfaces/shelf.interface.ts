import { Document } from 'mongoose';

export interface Shelf extends Document {
  readonly name: string;
}
