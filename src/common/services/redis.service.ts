import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  client: Redis;

  constructor(private readonly configService: ConfigService) {
    this.client = new Redis({
      host: this.configService.get<string>('REDIS_HOST'),
      port: this.configService.get<number>('REDIS_PORT'),
    });
  }

  async addToSet(key: string, value: string, expire: number): Promise<boolean> {
    const added = await this.client.sadd(key, value);
    if (added) {
      await this.client.expire(key, expire);
      return true;
    }
    return false;
  }

  async isMemberOfSet(key: string, value: string): Promise<boolean> {
    return (await this.client.sismember(key, value)) === 1;
  }
}
