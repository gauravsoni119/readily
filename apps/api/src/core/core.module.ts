import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseConfigService } from './mongoose-config/mongoose-config.service';

@Module({
  imports: [ConfigModule],
  providers: [MongooseConfigService]
})
export class CoreModule {}
