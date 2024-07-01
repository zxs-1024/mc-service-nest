import { Module } from '@nestjs/common';
import { HashidsService } from './services/hashids.service';

@Module({
  providers: [HashidsService],
  exports: [HashidsService],
})
export class CommonModule {}
