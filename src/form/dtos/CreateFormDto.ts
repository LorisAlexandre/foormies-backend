import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFormDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  projectName: string;

  description: string;
}
