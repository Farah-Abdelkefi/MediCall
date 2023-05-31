import { Optional } from '@nestjs/common';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
  IsEnum,
  Length,
  IsDate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  Validate,
  ValidateIf,
  IsDefined,
  IsOptional,
} from 'class-validator';
import { RoleEnum } from 'src/Enums/role.enum';

import { notEmpty, length } from 'src/Generics/error-messages';
import { SpecialityEntity } from 'src/speciality/entities/speciality.entity';
import { ManyToOne } from 'typeorm';

@ValidatorConstraint({ name: 'requiredIfRoleIsDoctor', async: false })
export class RequiredIfRoleIsDoctor implements ValidatorConstraintInterface {
  validate(value: any, args: any): boolean {
    return args.role === RoleEnum.DOCTOR ? value !== undefined : true;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'Speciality is required for doctors.';
  }
}

export class UserSubscribeDto {
  @IsNotEmpty({ message: (validationData) => notEmpty(validationData) })
  @Length(3, 10, { message: (validationData) => length(validationData) })
  firstname: string;

  @IsNotEmpty({ message: (validationData) => notEmpty(validationData) })
  @Length(3, 10, { message: (validationData) => length(validationData) })
  lastname: string;

  @IsNotEmpty({ message: (validationData) => notEmpty(validationData) })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  birthdate: Date;

  @IsNotEmpty({ message: (validationData) => notEmpty(validationData) })
  @Length(8, 20, { message: (validationData) => length(validationData) })
  password: string;

  @IsEnum(RoleEnum)
  role: RoleEnum;

  @ValidateIf((o) => o.role === RoleEnum.DOCTOR)
  @ManyToOne((type) => SpecialityEntity, (speciality) => speciality.doctors)
  @IsDefined({ message: 'Speciality is required for doctors.' })
  speciality: SpecialityEntity;
}
