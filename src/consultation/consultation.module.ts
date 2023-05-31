import { Module } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { ConsultationController } from './consultation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultationEntity } from './entities/consultation.entity';
import { pubSubProvider } from './pubsub.provider';

@Module({
  controllers: [ConsultationController],
  imports: [TypeOrmModule.forFeature([ConsultationEntity])],
  providers: [ConsultationService,pubSubProvider],
})
export class ConsultationModule {}
