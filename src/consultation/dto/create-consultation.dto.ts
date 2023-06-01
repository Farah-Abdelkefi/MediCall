import { IsBoolean, IsDate, IsNotEmpty } from 'class-validator';
import { DoctorEntity } from '../../doctor/entities/doctor.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { ManyToOne } from 'typeorm';

export class CreateConsultationDto {

  @ManyToOne((type) => DoctorEntity, (doctor) => doctor.consultations)
  doctor: DoctorEntity;

  @ManyToOne((type) => UserEntity, (patient) => patient.consultations)
  patient: UserEntity;

}
