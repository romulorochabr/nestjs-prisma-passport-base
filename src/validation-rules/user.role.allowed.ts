import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
import { UsersService } from 'src/users/users.service';
import { Injectable, Logger } from '@nestjs/common';
import { Role } from 'src/auth/enums/role.enum';
  
  @Injectable()
  @ValidatorConstraint({ async: true })
  export class IsUserRoleAllowed implements ValidatorConstraintInterface {
    
    private readonly logger = new Logger(IsUserRoleAllowed.name);

    constructor(private readonly usersService: UsersService) {}
  
    validate(role: Role) {
      this.logger.log(`Validating if role (${role}} is not ADMIN).`);
      return (role != Role.Admin);
    }
  }
  
  export function UserRoleAllowed(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsUserRoleAllowed,
      });
    };
  }