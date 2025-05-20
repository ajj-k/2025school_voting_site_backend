import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentorModule } from './mentor/mentor.module';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        const isProd = cfg.get('NODE_ENV') === 'production';
        return {
          type: 'postgres',
          url: cfg.get<string>('DATABASE_URL'),
          autoLoadEntities: true,
          synchronize: true,
          ssl: isProd ? { rejectUnauthorized: false } : false,
        };
      },
    }),
    MentorModule,
  ],
})
export class AppModule {}
