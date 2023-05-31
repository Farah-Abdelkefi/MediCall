import { PartialType } from '@nestjs/mapped-types';
import { CreateConsultationDto } from './create-consultation.dto';
import { Optional } from '@nestjs/common';
import { IsDate } from 'class-validator';

export class UpdateConsultationDto extends PartialType(CreateConsultationDto) {
 

  @Optional()
  @IsDate()
  date: Date;

}
