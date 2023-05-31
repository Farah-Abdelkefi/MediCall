import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecialityDto } from './create-speciality.dto';
import { IsOptional, Length } from 'class-validator';
import { length } from 'src/Generics/error-messages';

export class FindSpecialityDto extends PartialType(CreateSpecialityDto) {
  @IsOptional()
  @Length(3, 20, { message: (validationData) => length(validationData) })
  name: string;

  @IsOptional()
  @Length(5, 200, { message: (validationData) => length(validationData) })
  description: string;
}
