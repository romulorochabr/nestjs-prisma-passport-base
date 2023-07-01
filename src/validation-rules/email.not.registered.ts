import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
import { UsersService } from 'src/users/users.service';
import { Injectable, Logger } from '@nestjs/common';
  
  @Injectable()
  @ValidatorConstraint({ async: true })
  export class IsEmailNotRegistered implements ValidatorConstraintInterface {
    
    private readonly logger = new Logger(IsEmailNotRegistered.name);

    constructor(private readonly usersService: UsersService) {}
  
    validate(email: any) {
      this.logger.log(`Validando se email ja e registrado.`);
      return this.usersService.findByEmail(email).then((user) => {
        return !(user !== null && user !== undefined)
      });
    }
  }
  
  export function EmailNotRegistered(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsEmailNotRegistered,
      });
    };
  }