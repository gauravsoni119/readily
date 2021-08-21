import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ParseObjectIdPipe } from '../shared/parse-object-id/parse-object-id.pipe';
import { ShelfDto } from './dto/shelf.dto';
import { ShelvesService } from './shelves.service';

@Controller('shelves')
export class ShelvesController {
  constructor(private readonly shelvesService: ShelvesService) {}

  @Get()
  async findAll() {
    return await this.shelvesService.findAll();
  }

  @Post()
  async create(@Body() shelfDto: ShelfDto) {
    return await this.shelvesService.create(shelfDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() shelfDto: ShelfDto
  ) {
    const shelf = await this.shelvesService.findShelfById(id);
    return await this.shelvesService.update(shelf, shelfDto);
  }
}
