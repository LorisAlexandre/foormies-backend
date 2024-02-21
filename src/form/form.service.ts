import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Form } from 'src/schemas';
import { CreateFormDto, UpdateFormDto } from './dtos';
import { CreateQuestionDto } from 'src/question/dtos';

@Injectable()
export class FormService {
  constructor(@InjectModel(Form.name) private formModel: Model<Form>) {}

  async createForm(
    createFormDto: CreateFormDto,
    userId: string,
  ): Promise<Form> {
    const createdForm = new this.formModel({ userId, ...createFormDto });

    return createdForm.save();
  }

  async updateForm(
    updateFormDto: UpdateFormDto,
    formId: string,
    userId: string,
  ): Promise<Form> {
    const authorized = await this.verifUserId(userId, formId);

    if (authorized) {
      const updatedForm = await this.formModel.findByIdAndUpdate(
        formId,
        { ...updateFormDto },
        { new: true },
      );

      return updatedForm;
    }
  }

  async addQuestion(
    formId: string,
    userId: string,
    question: CreateQuestionDto,
  ): Promise<Form> {
    const authorized = await this.verifUserId(userId, formId);

    if (authorized) {
      const updatedForm = await this.formModel.findByIdAndUpdate(
        formId,
        {
          $push: { questions: question },
        },
        { new: true },
      );

      return updatedForm;
    }
  }

  async removeQuestion(
    formId: string,
    questionId: string,
    userId: string,
  ): Promise<boolean> {
    const authorized = await this.verifUserId(userId, formId);

    if (authorized) {
      await this.formModel.findByIdAndUpdate(formId, {
        $pull: { questions: questionId },
      });

      return true;
    }
  }

  async removeAllQuestion(userId: string, formId: string): Promise<void> {
    const authorized = await this.verifUserId(userId, formId);

    if (authorized) {
      await this.formModel.findByIdAndUpdate(formId, {
        questions: [],
      });

      return;
    }
  }

  async verifUserId(userId: string, formId: string): Promise<boolean> {
    const form = await this.formModel.findById(formId);

    if (userId !== form.userId.toString()) throw new UnauthorizedException();

    return true;
  }

  async deleteOne(formId: string, userId: string): Promise<boolean> {
    const authorized = await this.verifUserId(userId, formId);

    if (authorized) await this.formModel.findByIdAndDelete(formId);

    return true;
  }

  async getAllByUser(userId: string): Promise<Form[]> {
    const forms = await this.formModel.find({ userId });
    return forms;
  }

  async getById(formId: string, userId: string): Promise<Form> {
    const authorized = await this.verifUserId(userId, formId);

    if (authorized) {
      const form = await this.formModel.findById(formId);
      return form;
    }
  }
}
