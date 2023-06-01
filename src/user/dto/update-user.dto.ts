import { PartialType } from "@nestjs/mapped-types";
import { UserSubscribeDto } from "./user-subscribe.dto";



export class UpdateUserDto extends PartialType(UserSubscribeDto ) {
  
}
