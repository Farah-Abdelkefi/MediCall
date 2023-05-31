import { Global, Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from './entities/doctor.entity';
import { Passport } from 'passport';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import { SpecialityModule } from 'src/speciality/speciality.module';
import { SpecialityEntity } from 'src/speciality/entities/speciality.entity';
import { SpecialityService } from 'src/speciality/speciality.service';

dotenv.config();
@Global()
@Module({
  controllers: [DoctorController],
  imports: [
    SpecialityModule,
    TypeOrmModule.forFeature([DoctorEntity, SpecialityEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET,
    }),
  ],
  providers: [
    DoctorService,
    { provide: SpecialityService, useClass: SpecialityService },
  ],
  exports: [DoctorService],
})
export class DoctorModule {}
