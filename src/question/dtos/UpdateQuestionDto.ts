import { InputPropsSchema } from 'src/schemas';

export class UpdateQuestionDto {
  statement: string;
  inputProps: typeof InputPropsSchema;
  confidential: boolean;
  title: string;
  instructions: string;
  hint: string;
  file: {
    url: string;
    publicId: string;
  };
  section: number;
}
