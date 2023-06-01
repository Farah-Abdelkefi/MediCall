import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { SearchQueryDto } from './dto/search-query.dto';
import { DoctorEntity } from './entities/doctor.entity';
import { UserSubscribeDto } from 'src/user/dto/user-subscribe.dto';
import { LoginCredentialsDto } from 'src/user/dto/login-credentials.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { FindSpecialityDto } from 'src/speciality/dto/find-speciality.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @Get('speciality')
  FindDoctorsBySpeciality(
    @Body() spec: FindSpecialityDto,
  ): Promise<DoctorEntity[]> {
    return this.doctorService.FindDoctorsBySpeciality(spec);
  }

  @Get()
  findAll() {
    return this.doctorService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.softDelete(id);
  }

  @Patch('/restore/:id')
  restore(@Param('id') id: string) {
    return this.doctorService.restore(id);
  }
}
