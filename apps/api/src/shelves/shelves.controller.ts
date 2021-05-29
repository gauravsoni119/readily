import { Body, Controller, Get, Post } from '@nestjs/common';
import { Shelf } from './interfaces/shelf.interface';
import { ShelvesService } from './shelves.service';

@Controller('shelves')
export class ShelvesController {

  constructor(private readonly shelvesService: ShelvesService) {}

  @Get()
  async findAll() {
    return await this.shelvesService.findAll();
  }

  @Post()
  async create(@Body() shelf: Shelf) {
    return await this.shelvesService.create(shelf);
  }
}
