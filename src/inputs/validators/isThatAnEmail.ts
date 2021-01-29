import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { RegisterInput } from "inputs/RegisterInput";

@ValidatorConstraint({ async: true })
export class IsThatAnEmail implements ValidatorConstraintInterface {
  async validate(email: string): Promise<boolean> {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}

export function IsThatReallyAnEmailConstraint(
  validationOptions?: ValidationOptions
) {
  return function (object: RegisterInput, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsThatAnEmail,
    });
  };
}
