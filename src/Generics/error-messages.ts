import { ValidationArguments } from 'class-validator';

export const length = (validationData: ValidationArguments) =>
  `Length of ${validationData.property} ${validationData.value} should be between : 
   ${validationData.constraints[0]} and  ${validationData.constraints[1]}`;

export const notEmpty = (validationData: ValidationArguments) =>
  `property ${validationData.property} should not be empty`;
