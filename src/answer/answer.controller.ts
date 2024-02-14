import { Body, Controller, Param, Post } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { Public } from 'src/auth/decorators';
import { CreateAnswerDto } from './dtos';

@Controller('answer')
export class AnswerController {
  constructor(private answerService: AnswerService) {}

  @Public()
  @Post('create/:id')
  createOne(
    @Param('id') formId: string,
    @Body() createAnswerDto: CreateAnswerDto,
  ) {
    return this.answerService.createOne(formId, createAnswerDto);
  }
}
