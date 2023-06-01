import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService, FooResolver } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorModule } from './doctor/doctor.module';
import { ConsultationModule } from './consultation/consultation.module';
import { SpecialityModule } from './speciality/speciality.module';
import { DoctorEntity } from './doctor/entities/doctor.entity';
import { SpecialityEntity } from './speciality/entities/speciality.entity';
import { ConsultationEntity } from './consultation/entities/consultation.entity';
import { UserEntity } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    DoctorModule,
    ConsultationModule,
    SpecialityModule,
    UserModule,
    /*ConfigModule.forRoot({
      isGlobal:true,
    }),*/
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'projet-nest',
      entities: [
        DoctorEntity,
        SpecialityEntity,
        UserEntity,
        ConsultationEntity,
      ],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
