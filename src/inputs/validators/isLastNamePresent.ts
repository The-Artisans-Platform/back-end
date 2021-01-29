import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { RegisterInput } from "inputs/RegisterInput";

@ValidatorConstraint({ async: true })
export class IsLastNamePresent implements ValidatorConstraintInterface {
  async validate(lastName: string): Promise<boolean> {
    if (lastName.length === 0) return false;
    return true;
  }
}

export function LastNamePresenceConstraint(
  validationOptions?: ValidationOptions
) {
  return function (object: RegisterInput, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsLastNamePresent,
    });
  };
}
