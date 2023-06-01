import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {  Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserSubscribeDto } from 'src/user/dto/user-subscribe.dto';
import { LoginCredentialsDto } from 'src/user/dto/login-credentials.dto';
import { UserEntity } from './entities/user.entity';
import { RoleEnum } from '../Enums/role.enum';
import { GenericCrudService } from '../Generics/service/generic-crud.service';
import { DoctorService } from '../doctor/doctor.service';
import { SpecialityEntity } from '../speciality/entities/speciality.entity';

@Injectable()
export class UserService extends GenericCrudService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private readonly doctorService: DoctorService,
    @InjectRepository(SpecialityEntity)
    private specialityRepository: Repository<SpecialityEntity>,
  ) {
    super(userRepository);
  }

  async register(userData: UserSubscribeDto): Promise<Partial<UserEntity>> {
    const user = this.userRepository.create({
      ...userData,
    });

    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);

    try {
      if (user.role === RoleEnum.DOCTOR) {
        const spec = userData.speciality;

        const q = await this.specialityRepository
          .createQueryBuilder('speciality')
          .where('speciality.name = :name', { name: spec })
          .getOne();
        let doctor;
        doctor = {
          ...user,
          speciality: q,
          visitprice: 0,
        };
        await this.doctorService.create(doctor);
      } else {
        await this.userRepository.save(user);
      }
    } catch (e) {
      throw new ConflictException(`email and password are unique`);
    }

    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
    };
  }

  async login(credentials: LoginCredentialsDto) {
    const { email, password } = credentials;
    const user = await this.findOneByMail(email);
    const doctor = await this.doctorService.findOneByMail(email);
    if (!user && !doctor)
      throw new NotFoundException('username or password incorrect');
    if (user) {
      return this.IsLogged(password, user);
    } else {
      return this.IsLogged(password, doctor);
    }
  }
  async IsLogged(password: string, user: UserEntity) {
    const hashedPassword = await bcrypt.hash(password, user.salt);
    if (hashedPassword === user.password) {
      const payload = {
        id: user.id,
        role: user.role,
        authentificated: true,
      };
      const jwt = await this.jwtService.sign(payload);
      return { access_token: jwt };
    } else {
      throw new NotFoundException('username or password incorrect');
    }
  }
  
}
