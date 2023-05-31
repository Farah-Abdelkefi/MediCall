import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { notEmpty, length } from 'src/Generics/error-messages';

export class CreateSpecialityDto {
  @IsNotEmpty({ message: (validationData) => notEmpty(validationData) })
  @Length(3, 20, { message: (validationData) => length(validationData) })
  name: string;

  @IsNotEmpty({ message: (validationData) => notEmpty(validationData) })
  @Length(5, 200, { message: (validationData) => length(validationData) })
  description: string;
}
