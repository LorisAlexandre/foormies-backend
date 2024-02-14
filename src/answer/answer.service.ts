import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer, Form, Question } from 'src/schemas';
import { CreateAnswerDto } from './dtos';
import { FormService } from 'src/form/form.service';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer.name) private answerModel: Model<Answer>,
    @InjectModel(Form.name) private formModel: Model<Form>,
    private formService: FormService,
    @InjectModel(Question.name) private questionModel: Model<Form>,
  ) {}

  async createOne(
    formId: string,
    createAnswerDto: CreateAnswerDto,
  ): Promise<Answer> {
    const form = await this.formModel
      .findById(formId)
      .populate('questions')
      .lean()
      .exec();

    if (!this.checkRequiredQuestion(form, createAnswerDto)) {
      throw new HttpException(
        'Bad request, required question(s) forgotten',
        400,
      );
    }

    const answer = await new this.answerModel({ form, ...createAnswerDto });

    return answer.save();
  }

  async checkRequiredQuestion(
    form: Form,
    createAnswerDto: CreateAnswerDto,
  ): Promise<boolean> {
    const requiredQuestions = form.questions
      .filter((q) => q.inputProps['requiredQuestion'])
      .map((q) => q._id.toString());

    for (const questionId of requiredQuestions) {
      const answerExist = createAnswerDto.answers.some(
        (a) => a.questionId === questionId,
      );
      if (!answerExist) {
        return false;
      }
    }

    return true;
  }

  async getAllAnswerByForm(userId: string, formId: string): Promise<Answer[]> {
    const authorized = await this.formService.verifUserId(userId, formId);

    if (authorized) {
      const answers = await this.answerModel.find({ form: formId });
      return answers;
    }
  }

  async getOneAnswer(userId: string, answerId: string): Promise<Answer> {
    const answer = await this.answerModel.findById(answerId);

    const authorized = this.formService.verifUserId(
      userId,
      answer.form._id.toString(),
    );

    if (authorized) {
      return answer;
    }
  }

  async getAllAnswerByQuestion(
    userId: string,
    questionId: string,
  ): Promise<Answer[]> {
    const answers = await this.answerModel.find({ answers: { questionId } });

    const authorized = this.formService.verifUserId(
      userId,
      answers[0]['form']._id.toString(),
    );

    if (authorized) {
      return answers;
    }
  }
}
