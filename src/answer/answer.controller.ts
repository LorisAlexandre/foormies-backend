import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
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

  @Get('byId/:id')
  getOneById(@Param('id') answerId: string, @Req() req) {
    return this.answerService.getOneAnswer(req.user.sub, answerId);
  }

  @Get('allByForm/:id')
  getAllByForm(@Param('id') formId: string, @Req() req) {
    return this.answerService.getAllAnswerByForm(req.user.sub, formId);
  }

  @Get('allByQuestion/:id')
  getAllByQuestion(@Param('id') questionId: string, @Req() req) {
    return this.answerService.getAllAnswerByQuestion(req.user.sub, questionId);
  }
}
