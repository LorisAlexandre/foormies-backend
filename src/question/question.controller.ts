import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto, UpdateQuestionDto } from './dtos';

@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Post('create')
  createOne(
    @Req() req,
    @Body() body: { createQuestionDto: CreateQuestionDto; formId: string },
  ) {
    return this.questionService.createOne(
      body.formId,
      body.createQuestionDto,
      req.user.sub,
    );
  }

  @Patch('update/:id')
  updateOne(
    @Param('id') questionId: string,
    @Req() req,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.updateOne(
      questionId,
      req.user.sub,
      updateQuestionDto,
    );
  }

  @Delete('deleteOne/:id')
  deleteOne(@Param('id') questionId: string, @Req() req) {
    return this.questionService.deleteOne(req.user.sub, questionId);
  }

  @Delete('deleteAll/:id')
  deleteAll(@Param('id') formId: string, @Req() req) {
    return this.questionService.deleteAll(req.user.sub, formId);
  }

  @Get('byId/:id')
  getOneById(@Param('id') questionId: string, @Req() req) {
    return this.questionService.getOneById(req.user.sub, questionId);
  }
}
