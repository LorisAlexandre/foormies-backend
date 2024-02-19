import { ObjectId } from 'mongoose';
import { Form } from 'src/schemas';

export class CreateQuestionDto {
  title: string;
  questionType: string;
  hint: string;
  instructions: string;
  instructionFile: {
    url: string;
    publicId: string;
  };

  options: string[];
  multiple: boolean;
  confidential: boolean;
  requiredAnswer: boolean;

  minLength: number;
  maxLength: number;
  minValue: number;
  maxValue: number;

  _id: ObjectId;
  form: Form;
  userId: string;
}
