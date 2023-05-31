import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from './create-doctor.dto';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
  IsNumber,
  Length,
  IsIn,
  IsOptional,
  IsEnum,
  IsDate,
} from 'class-validator';
import { notEmpty, length } from 'src/Generics/error-messages';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
  @IsOptional()
  @Length(3, 10, { message: (validationData) => length(validationData) })
  firstname: string;

  @IsOptional()
  @Length(3, 10, { message: (validationData) => length(validationData) })
  lastname: string;

  @IsOptional()
  birthdate: Date;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @Length(8, 20, { message: (validationData) => length(validationData) })
  password: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  visitprice: number;
}
