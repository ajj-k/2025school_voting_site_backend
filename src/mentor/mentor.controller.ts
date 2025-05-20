import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { MentorService } from './mentor.service';
import { CreateMentorDto } from './dto/create-mentor.dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto/update-mentor.dto';

@Controller()
export class MentorController {
  constructor(private readonly service: MentorService) {}

  @Get()
  health() {
    return { message: 'API connect success' };
  }

  @Get('mentor/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post('mentor')
  create(@Body() dto: CreateMentorDto) {
    return this.service.create(dto);
  }

  @Post('mentor/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMentorDto) {
    return this.service.update(id, dto);
  }

  @Patch('mentor/:id/count')
  increment(@Param('id', ParseIntPipe) id: number) {
    return this.service.incrementCount(id);
  }

  @Get('mentors')
  async findAll() {
    const data = await this.service.findAll();
    return {
      status: 'success',
      meta: {
        total: data.length,
      },
      data,
    };
  }
}
