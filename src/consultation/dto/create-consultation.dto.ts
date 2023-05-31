import { IsBoolean, IsDate, IsNotEmpty } from 'class-validator';

export class CreateConsultationDto {
  @IsNotEmpty()
  channel: string;

}
