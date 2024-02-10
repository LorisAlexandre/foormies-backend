import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';
import { Question } from './question.schema';

export const FormCosmeticSchema = new mongoose.Schema({
  file: {
    url: { type: String, require: false },
    publicId: { type: String, require: false },
  },

  bgColor: { type: String, require: false },

  fontColor: { type: String, require: false },
});

export const FormSettingsSchema = new mongoose.Schema({
  isTest: { type: Boolean, require: true, default: false },
  emailCollect: { type: Boolean, require: true, default: false },
  progressBar: { type: Boolean, require: true, default: false },
  randomizeQuestion: { type: Boolean, require: true, default: false },
  showresults: { type: Boolean, require: true, default: false },
  requiredAllQuestions: { type: Boolean, require: true, default: false },
  sendBackAnswer: {
    type: String,
    require: true,
    default: 'no',
    enum: ['no', 'onDemand', 'always'],
  },
  confirmMessage: {
    type: String,
    require: true,
    default: 'Your answer has been recorded',
  },
});

@Schema()
export class Form {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ type: String, required: true })
  projectName: string;

  @Prop({ type: String, required: false })
  description: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Question',
    required: false,
  })
  questions: Question[];

  @Prop({ type: FormSettingsSchema, required: true, default: () => ({}) })
  settings: typeof FormSettingsSchema;

  @Prop({ type: FormCosmeticSchema, required: false, default: () => ({}) })
  cosmetic: typeof FormCosmeticSchema;

  _id: ObjectId;
}

export const FormSchema = SchemaFactory.createForClass(Form);
