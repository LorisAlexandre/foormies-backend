import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Form } from './form.schema';
import mongoose, { Mixed } from 'mongoose';
import { Question } from './question.schema';

@Schema()
export class Answer {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Form.name,
    required: true,
  })
  form: Form;

  @Prop({ type: Object, required: true })
  answers: [{ questionId: Question; value: Mixed }];

  @Prop({ type: String, required: true, default: 'incognito' })
  username: string;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
