import { Global, Module } from '@nestjs/common';
import { SpecialityService } from './speciality.service';
import { SpecialityController } from './speciality.controller';
import { SpecialityEntity } from './entities/speciality.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  controllers: [SpecialityController],
  imports: [TypeOrmModule.forFeature([SpecialityEntity])],
  providers: [SpecialityService],
  exports: [SpecialityService],
})
export class SpecialityModule {}
