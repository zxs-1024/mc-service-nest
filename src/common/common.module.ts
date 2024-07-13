import { Module } from '@nestjs/common';
import { HashidsService } from './services/hashids.service';
import { RedisService } from './services/redis.service';

@Module({
  providers: [HashidsService, RedisService],
  exports: [HashidsService, RedisService],
})
export class CommonModule {}
