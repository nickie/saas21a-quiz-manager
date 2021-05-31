import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Question } from './entities/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Quiz } from '../quiz/entities/quiz.entity';

@Injectable()
export class QuestionService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    return this.manager.transaction(async manager => {
      const quizId = createQuestionDto.quiz.id;
      if (!quizId)
        throw new BadRequestException('Quiz id missing.');
      const quiz = await this.manager.findOne(Quiz, createQuestionDto.quiz.id);
      if (!quiz)
        throw new NotFoundException(`Quiz ${quizId} not found.`);
      const question = await this.manager.create(Question, createQuestionDto);
      question.quiz = quiz;
      return this.manager.save(question);
    });
  }

  async findAll(): Promise<Question[]> {
    return this.manager.find(Question, { relations: ["quiz"] });
  }

  async findOne(id: number): Promise<Question> {
    const question = await this.manager.findOne(Question, id, { relations: ["quiz"] });
    if (!question) throw new NotFoundException(`Question ${id} not found.`);
    return question;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
    return this.manager.transaction(async manager => {
      const question = await manager.findOne(Question, id, { relations: ["quiz"] });
      if (!question) throw new NotFoundException(`Question ${id} not found.`);
      manager.merge(Question, question, updateQuestionDto);
      return manager.save(question);
    });
  }

  async remove(id: number): Promise<void> {
    return this.manager.transaction(async manager => {
      const question = await manager.findOne(Question, id);
      if (!question) throw new NotFoundException(`Question ${id} not found.`);
      await manager.delete(Question, id);
    });
  }
}
