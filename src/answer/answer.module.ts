import { Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Answer,
  AnswerSchema,
  Form,
  FormSchema,
  Question,
  QuestionSchema,
} from 'src/schemas';
import { FormModule } from 'src/form/form.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Answer.name,
        schema: AnswerSchema,
      },
      {
        name: Form.name,
        schema: FormSchema,
      },
      {
        name: Question.name,
        schema: QuestionSchema,
      },
    ]),
    FormModule,
  ],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
