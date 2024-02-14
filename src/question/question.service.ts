import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from 'src/schemas';
import { CreateQuestionDto, UpdateQuestionDto } from './dtos';
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
    const createdQuestion = await new this.questionModel({
      form: formId,
      userId,
      ...createQuestionDto,
    });

    await this.formService.addQuestion(formId, userId, createdQuestion);

    return createdQuestion.save();
  }

  async updateOne(
    questionId: string,
    userId: string,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    const authorized = await this.verifUserId(userId, questionId);

    if (authorized) {
      const updatedQuestion = await this.questionModel.findByIdAndUpdate(
        questionId,
        { ...updateQuestionDto },
        { new: true },
      );

      return updatedQuestion;
    }
  }

  async deleteOne(userId: string, questionId: string): Promise<void> {
    const authorized = await this.verifUserId(userId, questionId);
    const question = await this.questionModel.findById(questionId);

    if (authorized) {
      await this.formService.removeQuestion(
        question.form._id as unknown as string,
        questionId,
        userId,
      );
      await this.questionModel.findByIdAndDelete(questionId);
    }
  }

  async deleteAll(userId: string, formId): Promise<void> {
    const authorized = this.formService.verifUserId(userId, formId);

    if (authorized) {
      await this.formService.removeAllQuestion(userId, formId);
      await this.questionModel.deleteMany({ form: { _id: formId } });

      return;
    }
  }

  async verifUserId(userId: string, questionId: string): Promise<boolean> {
    const question = await this.questionModel.findById(questionId);

    if (!question.userId) throw new UnauthorizedException();
    if (userId !== question.userId.toString())
      throw new UnauthorizedException();

    return true;
  }

  async getOneById(userId: string, questionId: string): Promise<Question> {
    const authorized = await this.verifUserId(userId, questionId);

    if (authorized) {
      const question = await this.questionModel.findById(questionId);

      return question;
    }
  }
}
