import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';

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

export const InputPropsSchema = new mongoose.Schema({
  questionType: {
    type: String,
    enum: inputTypes,
    default: 'text',
    require: false,
  },
  label: { type: String, require: false },
  placeholder: { type: String, require: false },
  options: { type: [String], require: false },
  minLength: { type: Number, require: false },
  maxLength: { type: Number, require: false },
  minValue: { type: Number, require: false },
  maxValue: { type: Number, require: false },
  pattern: { type: String, require: false },
  multiple: { type: Boolean, require: false },
  required: { type: Boolean, require: false },
  rank: { type: Number, require: false },
});

@Schema()
export class Question {
  @Prop({ required: false, type: String })
  statement: string;

  @Prop({ required: false, type: InputPropsSchema, default: () => ({}) })
  inputProps: typeof InputPropsSchema;

  @Prop({ required: false, type: Boolean })
  confidential: boolean;

  @Prop({ required: true, type: String, default: 'No title' })
  title: string;

  @Prop({ required: false, type: String })
  instructions: string;

  @Prop({ required: false, type: String })
  hint: string;

  @Prop({ type: Object, required: false })
  file: {
    url: string;
    publicId: string;
  };

  @Prop({ type: Number, required: false })
  section: number;

  _id: ObjectId;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
