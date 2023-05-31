import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserEntity } from './entities/user.entity';
import { DoctorModule } from '../doctor/doctor.module';
import { DoctorService } from '../doctor/doctor.service';
import { DoctorEntity } from '../doctor/entities/doctor.entity';
import { SpecialityEntity } from '../speciality/entities/speciality.entity';
import { SpecialityModule } from '../speciality/speciality.module';
import { SpecialityService } from '../speciality/speciality.service';

@Module({
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([UserEntity, SpecialityEntity, DoctorEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET,
    }),
    DoctorModule,
    SpecialityModule,
  ],
  providers: [
    UserService,
    { provide: DoctorService, useClass: DoctorService },
    { provide: SpecialityService, useClass: SpecialityService },
  ],
})
export class UserModule {}
