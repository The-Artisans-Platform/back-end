import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { LoginInput } from "inputs/LoginInput";
// import { Message } from "types";

@ValidatorConstraint({ async: true })
export class IsEmailPresent implements ValidatorConstraintInterface {
  async validate(email: string): Promise<boolean> {
    if (email.length === 0) return false;
    return true;
  }
}

export function EmailPresenceConstraint(validationOptions?: ValidationOptions) {
  return function (object: LoginInput, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailPresent,
    });
  };
}
