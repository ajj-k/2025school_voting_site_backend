import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mentor } from './entities/mentor/mentor';
import { CreateMentorDto } from './dto/create-mentor.dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto/update-mentor.dto';

@Injectable()
export class MentorService {
  constructor(
    @InjectRepository(Mentor)
    private readonly repo: Repository<Mentor>,
  ) {}

  async findAll(): Promise<Mentor[]> {
    return this.repo.find({ order: { count: 'DESC' } });
  }

  async findOne(id: number): Promise<Mentor> {
    const m = await this.repo.findOne({ where: { id } });
    if (!m) throw new NotFoundException(`Mentor #${id} not found`);
    return m;
  }

  async create(dto: CreateMentorDto): Promise<Mentor> {
    const mentor = this.repo.create({ ...dto, count: 0 });
    return this.repo.save(mentor);
  }

  async update(id: number, dto: UpdateMentorDto): Promise<Mentor> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async incrementCount(id: number): Promise<Mentor> {
    const mentor = await this.findOne(id);
    mentor.count += 1;
    return this.repo.save(mentor);
  }
}
