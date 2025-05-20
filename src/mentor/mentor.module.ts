import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mentor } from './entities/mentor/mentor';
import { MentorService } from './mentor.service';
import { MentorController } from './mentor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Mentor])],
  controllers: [MentorController],
  providers: [MentorService],
})
export class MentorModule {}
