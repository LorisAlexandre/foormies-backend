import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Form, FormSchema } from 'src/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Form.name,
        schema: FormSchema,
      },
    ]),
  ],
  providers: [FormService],
  controllers: [FormController],
})
export class FormModule {}
