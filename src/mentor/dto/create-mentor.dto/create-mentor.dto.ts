import { IsNotEmpty, IsString } from 'class-validator';
export class CreateMentorDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
