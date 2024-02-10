import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from 'src/schemas';
import { CreateQuestionDto } from './dtos';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>,
  ) {}

  async createOne(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const createdQuestion = await new this.questionModel(createQuestionDto);

    return createdQuestion;
  }
}
