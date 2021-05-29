import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShelvesModule } from '../shelves/shelves.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ShelvesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
