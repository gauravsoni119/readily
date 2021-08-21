import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ShelvesModule } from '../shelves/shelves.module';
import { BooksModule } from '../books/books.module';
import { MongooseConfigService } from '../core/mongoose-config/mongoose-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    ShelvesModule,
    BooksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
