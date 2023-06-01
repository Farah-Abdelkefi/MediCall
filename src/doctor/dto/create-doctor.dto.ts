import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
  IsNumber,
  Length,
  IsDate,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { RoleEnum } from 'src/Enums/role.enum';

import { notEmpty, length } from 'src/Generics/error-messages';
import { SpecialityEntity } from 'src/speciality/entities/speciality.entity';
import { UserSubscribeDto } from 'src/user/dto/user-subscribe.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { ManyToOne, OneToOne } from 'typeorm';

export class CreateDoctorDto extends UserSubscribeDto {
  

  @IsNotEmpty({ message : 'Speciality is required for doctors.'})
  @ManyToOne(
    type => SpecialityEntity,
    (speciality)=> speciality.doctors ,
   )
   speciality :SpecialityEntity ;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  visitprice: number;
}
