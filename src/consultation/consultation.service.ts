import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Brackets, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericCrudService } from '../Generics/service/generic-crud.service';
import { ConsultationEntity } from './entities/consultation.entity';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { RtcTokenBuilder, RtcRole } from "agora-token";
import * as dotenv from 'dotenv';
// import {  } from "../../.env";

@Injectable()
export class ConsultationService extends GenericCrudService<ConsultationEntity> {
 
  constructor(
    @InjectRepository(ConsultationEntity)
    private consultationRepository: Repository<ConsultationEntity>
  ) {
    super(consultationRepository);
  }

  async getNumberConsultations() : Promise <number> {
    const c = await this.consultationRepository 
      .createQueryBuilder('c')
      .getCount();
    return c ;
  }
  async create(
    createConsultationDto: CreateConsultationDto,
  ): Promise<ConsultationEntity> {
    const c = await (this.getNumberConsultations())+1;
    const chan = "channel" + c;
    const con = {
      channel : chan,
      doctor : createConsultationDto.doctor,
      patient : createConsultationDto.patient
    };
    return await this.consultationRepository.save(con);
  }

  async findBydocterandbyuser(docId : string , patId : string) : Promise <ConsultationEntity>
  {
    const element = await this.consultationRepository
      .createQueryBuilder('c')
      .where('c.doctor = :iddoctor', { iddoctor: docId })
      .andWhere('c.patient= :iduser', { iduser: patId })
      .getOne();

    if (!element) {
      throw new NotFoundException('not found hahah');
    }
    return element;
    
  }

  async getAcceptedConsultation (id : string): Promise<ConsultationEntity[]>{
    const con = await this.consultationRepository
    .createQueryBuilder('c')
    .where("c.acceptee = 1 AND ((c.patient = :id) OR (c.doctor = :id) ) ", {id : id})
    //.getRawMany();
    .getRawMany();
    if (!con)
      throw new NotFoundException(" couldn't find accepted consultations ");
      
    return con  ;
  }

  async getRequests (id : string) : Promise<ConsultationEntity[]>{
    const con = await this.consultationRepository
    .createQueryBuilder('c')
    .where("c.acceptee = 0 AND ((c.patient = :id) OR (c.doctor = :id) ) ", {id : id})
    .getRawMany()
    ;
    if (!con)
      throw new NotFoundException(" couldn't find accepted consultations ");
    
    return con ;

  }

  async accept(id : string,accept : UpdateConsultationDto) {
    const con = await this.findOne(id);
    if(!con){
      throw new NotFoundException(" can't find id ")
    }
    con.acceptee = 1 ;
    con.date = new Date(accept.date) ;
    con.token =  this.generateToken(con).token;
    const q = this.consultationRepository.save(con);
    if ( !q){
      throw new NotFoundException ("couldn't update date ");
    }
    
    return con ;
    
  }
 
 generateToken (con : ConsultationEntity) {
    // Rtc Examples
    const appId = process.env.APP_ID ;
    const appCertificate = 'e879ef0eca834e24b5a05edd4729e717';
    const channelName = con.channel ;

    const userAccount = "";
    const role = RtcRole.PUBLISHER;
  
    const expirationTimeInSeconds = 86400 ;
  
    const timestamp = con.date.getSeconds();
    // const timestamp = Math.floor((con.date.getTime() - Date.now())/1000); 
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = timestamp + expirationTimeInSeconds;
    // Build token with user account
    const token = RtcTokenBuilder.buildTokenWithUserAccount(appId, appCertificate, channelName, userAccount, role,timestamp, privilegeExpiredTs);
    return {
      "token" : token ,
      "appId" : appId,
      'channelName' : channelName
    }
 }
}
