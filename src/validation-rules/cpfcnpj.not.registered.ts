import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
import { UsersService } from 'src/users/users.service';
import { Injectable, Logger } from '@nestjs/common';
import { sanitizeCpfCnpj } from 'src/utils/cpf.cnpj.sanitize.function';
  
  @Injectable()
  @ValidatorConstraint({ async: true })
  export class IsCpfCnpjNotRegistered implements ValidatorConstraintInterface {
    
    private readonly logger = new Logger(IsCpfCnpjNotRegistered.name);

    constructor(private readonly usersService: UsersService) {}
  
    validate(cpfCnpj: any) {
      this.logger.log(`Validando se CPF/CNPJ ja e registrado.`);
      cpfCnpj = sanitizeCpfCnpj(cpfCnpj);
      return this.usersService.findByCpfCnpj(cpfCnpj).then((user) => {
         return !(user !== null && user !== undefined)
      });
    }
  }
  
  export function CpfCnpjNotRegistered(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsCpfCnpjNotRegistered,
      });
    };
  }