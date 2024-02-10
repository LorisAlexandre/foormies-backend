import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Form } from 'src/schemas';
import { CreateFormDto, UpdateFormDto } from './dtos';

@Injectable()
export class FormService {
  constructor(@InjectModel(Form.name) private formModel: Model<Form>) {}

  async createForm(createFormDto: CreateFormDto): Promise<Form> {
    const createdForm = new this.formModel(createFormDto);

    return createdForm.save();
  }

  async updateForm(
    updateFormDto: UpdateFormDto,
    _id: string,
    userId: string,
  ): Promise<Form> {
    const form = await this.formModel.findById(_id);

    if (userId !== form.userId) throw new UnauthorizedException();

    const updatedForm = await this.formModel.findByIdAndUpdate(
      _id,
      { ...updateFormDto },
      { new: true },
    );

    return updatedForm;
  }

  async deleteOne(_id: string, userId: string) {
    const form = await this.formModel.findById(_id);

    if (userId !== form.userId) throw new UnauthorizedException();

    await this.formModel.findByIdAndDelete(_id);

    return;
  }

  async getAllByUser(userId: string): Promise<Form[]> {
    const forms = await this.formModel.find({ userId });
    return forms;
  }

  async getById(id: string): Promise<Form> {
    const form = await this.formModel.findById(id);
    return form;
  }
}
