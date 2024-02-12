import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from 'src/schemas';
import { CreateQuestionDto } from './dtos';
import { FormService } from 'src/form/form.service';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>,
    private formService: FormService,
  ) {}

  async createOne(
    formId: string,
    createQuestionDto: CreateQuestionDto,
    userId: string,
  ): Promise<Question> {
    const createdQuestion = await new this.questionModel(createQuestionDto);

    const form = await this.formService.getById(formId);

    await this.formService.addQuestion(formId, createdQuestion);

    return createdQuestion;
  }
}
