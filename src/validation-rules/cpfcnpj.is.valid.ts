import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
import { UsersService } from 'src/users/users.service';
import { Injectable, Logger } from '@nestjs/common';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import { sanitizeCpfCnpj } from 'src/utils/cpfcnpj.clean.function';

  @Injectable()
  @ValidatorConstraint({ async: true })
  export class IsCpfCnpjNotValid implements ValidatorConstraintInterface {
    
    private readonly logger = new Logger(IsCpfCnpjNotValid.name);

    constructor(private readonly usersService: UsersService) {}
  
    validate(cpfCnpj: any) {
        this.logger.log(`Validando se CPF/CNPJ e valido.`);
        if(typeof(cpfCnpj) !== 'string'){
            return false;
        }
        // Clean before testing
        cpfCnpj = sanitizeCpfCnpj(cpfCnpj);
        // Test if one of CPF or CNPJ is valid
        if(!cpf.isValid(cpfCnpj) && !cnpj.isValid(cpfCnpj)){
            return false;
        }
        return true;
    }
  }
  
  export function CpfCnpjNotValid(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsCpfCnpjNotValid,
      });
    };
  }