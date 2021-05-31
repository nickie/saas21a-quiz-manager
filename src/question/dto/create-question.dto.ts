import { IsDefined, IsOptional, IsNumber, IsNotEmpty, IsString,
          ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectWithId } from '../../validation';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  readonly text: string;

  @IsString()
  @IsNotEmpty()
  readonly optionA: string;

  @IsString()
  @IsNotEmpty()
  readonly optionB: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly optionC: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly optionD: string;

  @IsNumber()
  readonly markA: number;

  @IsNumber()
  readonly markB: number;

  @IsOptional()
  @IsNumber()
  readonly markC: number;

  @IsOptional()
  @IsNumber()
  readonly markD: number;

  @IsDefined()
  @ValidateNested()
  @Type(() => ObjectWithId)
  readonly quiz: ObjectWithId;
}
