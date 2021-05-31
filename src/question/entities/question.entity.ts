import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Quiz } from "../../quiz/entities/quiz.entity";

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  optionA: string;

  @Column()
  optionB: string;

  @Column({ nullable: true })
  optionC: string;

  @Column({ nullable: true })
  optionD: string;

  @Column()
  markA: number;

  @Column()
  markB: number;

  @Column({ nullable: true })
  markC: number;

  @Column({ nullable: true })
  markD: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Quiz, quiz => quiz.questions, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: 'quizId' })
  quiz: Quiz;
}
