import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './entities/quiz.entity';
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

@Injectable()
export class QuizService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const quiz = await this.manager.create(Quiz, createQuizDto);
    return this.manager.save(quiz);
  }

  async findAll(): Promise<Quiz[]> {
    return this.manager.find(Quiz);
  }

  async findOne(id: number): Promise<Quiz> {
    const quiz = await this.manager.findOne(Quiz, id, { relations: ["questions"] });
    if (!quiz) throw new NotFoundException(`Quiz ${id} not found.`);
    return quiz;
  }

  async update(id: number, updateQuizDto: UpdateQuizDto): Promise<Quiz>  {
    return this.manager.transaction(async manager => {
      const quiz = await manager.findOne(Quiz, id, { relations: ["questions"] });
      if (!quiz) throw new NotFoundException(`Quiz ${id} not found.`);
      manager.merge(Quiz, quiz, updateQuizDto);
      return manager.save(quiz);
    });
  }

  async remove(id: number): Promise<void> {
    return this.manager.transaction(async manager => {
      const quiz = await manager.findOne(Quiz, id);
      if (!quiz) throw new NotFoundException(`Quiz ${id} not found.`);
      await manager.delete(Quiz, id);
    });
  }
}
