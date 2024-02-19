import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';
import { Form } from './form.schema';
import { User } from './user.schema';

export const inputTypes = [
  'button',
  'checkbox',
  'color',
  'date',
  'datetime-local',
  'email',
  'file',
  'month',
  'number',
  'password',
  'radio',
  'range',
  'reset',
  'search',
  'submit',
  'tel',
  'text',
  'time',
  'url',
  'week',
];

@Schema()
export class Question {
  @Prop({ required: true, type: String, default: 'No title' })
  title: string;

  @Prop({ required: true, type: String, enum: inputTypes, default: 'text' })
  questionType: string;

  @Prop({ required: true, type: String, default: '' })
  instructions: string;

  @Prop({ type: Object, required: false, default: () => {} })
  instructionFile: {
    url: string;
    publicId: string;
  };

  @Prop({ required: false, type: String, default: '' })
  hint: string;

  @Prop({ required: false, type: [String], default: [] })
  options: string[];

  @Prop({ required: false, type: Boolean, default: false })
  multiple: boolean;

  @Prop({ required: true, type: Boolean, default: true })
  requiredAnswer: boolean;

  @Prop({ required: false, type: Number, default: 0 })
  minLength: number;

  @Prop({ required: false, type: Number, default: 150 })
  maxLength: number;

  @Prop({ required: false, type: Number, default: 0 })
  minValue: number;

  @Prop({ required: false, type: Number, default: 150 })
  maxValue: number;

  @Prop({ required: false, type: Boolean, default: false })
  confidential: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true })
  form: Form;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  userId: string;

  _id: ObjectId;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
