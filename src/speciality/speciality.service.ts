import { Injectable, NotFoundException } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecialityEntity } from './entities/speciality.entity';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { GenericCrudService } from '../Generics/service/generic-crud.service';
import { DoctorEntity } from '../doctor/entities/doctor.entity';
import { FindSpecialityDto } from './dto/find-speciality.dto';

@Injectable()
export class SpecialityService extends GenericCrudService<SpecialityEntity> {
  constructor(
    @InjectRepository(SpecialityEntity)
    private specialityRepository: Repository<SpecialityEntity>,
  ) {
    super(specialityRepository);
  }

  create(newSpeciality: CreateSpecialityDto): Promise<SpecialityEntity> {
    return this.specialityRepository.save(newSpeciality);
  }

  async getSpeciality(spec: string): Promise<SpecialityEntity> {
    return await this.specialityRepository
      .createQueryBuilder('speciality')
      .where('speciality.name = :name', { name: spec })
      .getOne();
  }
}
