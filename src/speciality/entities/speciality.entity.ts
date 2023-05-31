import { TimestampEntity } from 'src/Generics/timestamp.entity';
import { DoctorEntity } from 'src/doctor/entities/doctor.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('speciality')
export class SpecialityEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany((type) => DoctorEntity, (doctor) => doctor.speciality, {
    cascade: true,
    eager: true,
  })
  doctors: DoctorEntity[];
}
