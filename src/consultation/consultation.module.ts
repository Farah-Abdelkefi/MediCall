import { Module } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { ConsultationController } from './consultation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultationEntity } from './entities/consultation.entity';


@Module({
  controllers: [ConsultationController],
  imports: [TypeOrmModule.forFeature([ConsultationEntity]),
  ],
  providers: [ConsultationService],
})
export class ConsultationModule {}
