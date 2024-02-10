import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { QuestionModule } from './question/question.module';
import { FormModule } from './form/form.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('DB_URL'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    FormModule,
    QuestionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
