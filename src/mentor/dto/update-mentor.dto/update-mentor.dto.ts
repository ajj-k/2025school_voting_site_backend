import { IsInt, IsOptional, IsString, Min } from 'class-validator';
export class UpdateMentorDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  count?: number;
}
