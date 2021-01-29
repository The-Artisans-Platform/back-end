import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { RegisterInput } from "inputs/RegisterInput";

@ValidatorConstraint({ async: true })
export class IsFirstNamePresent implements ValidatorConstraintInterface {
  async validate(firstName: string): Promise<boolean> {
    if (firstName.length === 0) return false;
    return true;
  }
}

export function FirstNamePresenceConstraint(
  validationOptions?: ValidationOptions
) {
  return function (object: RegisterInput, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsFirstNamePresent,
    });
  };
}
