
import { SpecialityEntity } from '../../speciality/entities/speciality.entity';
import { UserEntity } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  
} from 'typeorm';

@Entity('doctor')
export class DoctorEntity extends UserEntity {

  @ManyToOne((type) => SpecialityEntity, (speciality) => speciality.doctors)
  speciality: SpecialityEntity;

  @Column()
  visitprice: number;
  @Column()
  image : string;
}
