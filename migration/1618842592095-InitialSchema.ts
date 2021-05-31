import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1618842592095 implements MigrationInterface {
    name = 'InitialSchema1618842592095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "quiz" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "question" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" varchar NOT NULL, "optionA" varchar NOT NULL, "optionB" varchar NOT NULL, "optionC" varchar, "optionD" varchar, "markA" integer NOT NULL, "markB" integer NOT NULL, "markC" integer, "markD" integer, "quizId" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_question" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" varchar NOT NULL, "optionA" varchar NOT NULL, "optionB" varchar NOT NULL, "optionC" varchar, "optionD" varchar, "markA" integer NOT NULL, "markB" integer NOT NULL, "markC" integer, "markD" integer, "quizId" integer NOT NULL, CONSTRAINT "FK_4959a4225f25d923111e54c7cd2" FOREIGN KEY ("quizId") REFERENCES "quiz" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_question"("id", "text", "optionA", "optionB", "optionC", "optionD", "markA", "markB", "markC", "markD", "quizId") SELECT "id", "text", "optionA", "optionB", "optionC", "optionD", "markA", "markB", "markC", "markD", "quizId" FROM "question"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`ALTER TABLE "temporary_question" RENAME TO "question"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question" RENAME TO "temporary_question"`);
        await queryRunner.query(`CREATE TABLE "question" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" varchar NOT NULL, "optionA" varchar NOT NULL, "optionB" varchar NOT NULL, "optionC" varchar, "optionD" varchar, "markA" integer NOT NULL, "markB" integer NOT NULL, "markC" integer, "markD" integer, "quizId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "question"("id", "text", "optionA", "optionB", "optionC", "optionD", "markA", "markB", "markC", "markD", "quizId") SELECT "id", "text", "optionA", "optionB", "optionC", "optionD", "markA", "markB", "markC", "markD", "quizId" FROM "temporary_question"`);
        await queryRunner.query(`DROP TABLE "temporary_question"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TABLE "quiz"`);
    }

}
