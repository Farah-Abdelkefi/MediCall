import { PartialType } from '@nestjs/mapped-types';
import { CreateConsultationDto } from './create-consultation.dto';
import { Optional } from '@nestjs/common';
import { IsDate } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateConsultationDto extends PartialType(CreateConsultationDto) {
  @Optional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date: Date;
}
