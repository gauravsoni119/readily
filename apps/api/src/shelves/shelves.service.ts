import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Shelf } from './interfaces/shelf.interface';

@Injectable()
export class ShelvesService {

  constructor(@Inject('SHELF_MODEL') private readonly shelfModel: Model<Shelf>) {}

  async findAll(): Promise<Shelf[]> {
    return this.shelfModel.find().exec();
  }

  async create(shelf: Shelf): Promise<Shelf> {
    const newShelf = new this.shelfModel(shelf);
    return newShelf.save();
  }
}
