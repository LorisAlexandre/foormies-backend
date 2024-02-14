import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class CreateAnswerDto {
  @IsArray()
  @IsNotEmpty()
  answers: [{ questionId: string; value: any }];

  @IsString()
  username: string;
}
