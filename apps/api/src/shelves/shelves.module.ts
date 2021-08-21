import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShelvesController } from './shelves.controller';
import { ShelvesService } from './shelves.service';
import { ShelfSchema } from './schemas/shelf.schema';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [
    BooksModule,
    MongooseModule.forFeature([{ name: 'Shelve', schema: ShelfSchema }]),
  ],
  controllers: [ShelvesController],
  providers: [ShelvesService],
})
export class ShelvesModule {}
