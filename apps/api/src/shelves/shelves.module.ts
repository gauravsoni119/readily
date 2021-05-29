import { Module } from '@nestjs/common';
import { ShelvesController } from './shelves.controller';
import { ShelvesService } from './shelves.service';
import { shelvesProviders } from './shelves-providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ShelvesController],
  providers: [ShelvesService, ...shelvesProviders]
})
export class ShelvesModule {}
