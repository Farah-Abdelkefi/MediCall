import { IsOptional } from 'class-validator';
import { SpecialityEntity } from 'src/speciality/entities/speciality.entity';
import { ManyToOne } from 'typeorm';

export class SearchQueryDto {
  @IsOptional()
  @ManyToOne((type) => SpecialityEntity, (speciality) => speciality.doctors)
  speciality: SpecialityEntity;
}
