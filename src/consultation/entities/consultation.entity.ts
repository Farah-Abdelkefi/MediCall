import { Column, Entity, IsNull, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from '../../Generics/timestamp.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { DoctorEntity } from '../../doctor/entities/doctor.entity';

@Entity('consultation')
export class ConsultationEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: String;

  @Column()
  channel: string;

  @Column({default : null})
  date: Date = null;

  @Column({default : 0})
  acceptee: number ;

  @ManyToOne((type) => DoctorEntity, (doctor) => doctor.consultations)
  doctor: DoctorEntity;

  @ManyToOne((type) => UserEntity, (patient) => patient.consultations)
  patient: UserEntity;
}
