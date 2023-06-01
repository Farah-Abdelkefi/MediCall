import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserSubscribeDto } from 'src/user/dto/user-subscribe.dto';
import { LoginCredentialsDto } from 'src/user/dto/login-credentials.dto';
import { ConsultationService } from './consultation.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';


@Controller('consultation')
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService,
    
    ) {}

  @Post()
  create(@Body() createConsultationDto: CreateConsultationDto) {
    return this.consultationService.create(createConsultationDto);
  }

  @Get()
  findAll() {
    return this.consultationService.findAll();
  }

  // @Get('accepted/:id')
  // getAcceptedConsultation (@Param('id') id : string){
  //   return this.consultationService.getAcceptedConsultation(id);
  // }
  // @Get("requests/:id")
  // getRequests(@Param('id') id : string){
  //   return this.consultationService.getRequests(id);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultationService.findOne(id);
  }

  @Patch(':id')
  accept(@Param('id') id: string, @Body() updateDto: UpdateConsultationDto) {
    return this.consultationService.accept(id, updateDto);
  }

  @Delete(':id')
  refuse(@Param('id') id: string) {
    return this.consultationService.softDelete(id);
  }

  @Patch('/restore/:id')
  restore(@Param('id') id: string) {
    return this.consultationService.restore(id);
  }

}
