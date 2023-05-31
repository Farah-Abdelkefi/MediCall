import { RoleEnum } from 'src/Enums/role.enum';
import { TimestampEntity } from 'src/Generics/timestamp.entity';
import { ConsultationEntity } from 'src/consultation/entities/consultation.entity';
import { SpecialityEntity } from 'src/speciality/entities/speciality.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends TimestampEntity {
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

  @OneToMany(
    (type) => ConsultationEntity,
    (consultations) => consultations.patient,
    { cascade: true, eager: true },
  )
  consultations: ConsultationEntity[];
}
