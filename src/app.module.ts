import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuestionModule } from './question/question.module';

@Module({
  imports: [
    QuizModule,
    TypeOrmModule.forRoot(),
    QuestionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
