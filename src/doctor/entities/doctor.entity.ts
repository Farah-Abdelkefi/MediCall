
import { PartialType } from '@nestjs/mapped-types';
import { ConsultationEntity } from '../../consultation/entities/consultation.entity';
import { SpecialityEntity } from '../../speciality/entities/speciality.entity';
import { UserEntity } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  
} from 'typeorm';
import { RoleEnum } from 'src/Enums/role.enum';
import { TimestampEntity } from 'src/Generics/timestamp.entity';

@Entity('doctor')
export class DoctorEntity extends TimestampEntity {


  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  birthdate: Date;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  password: string;

  @Column()
  salt: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
  })
  role: string;
  
  @ManyToOne((type) => SpecialityEntity, (speciality) => speciality.doctors)
  speciality: SpecialityEntity;

  @Column()
  visitprice: number;
  @Column()
  image : string;

  @OneToMany(
    (type) => ConsultationEntity,
    (consultations) => consultations.doctor,
    { cascade: true, eager: true },
  )
  consultations: ConsultationEntity[];
}
