import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { ChangePasswordInput } from "inputs/ChangePasswordInput";
import { LoginInput } from "inputs/LoginInput";
import { RegisterInput } from "inputs/RegisterInput";

@ValidatorConstraint({ async: true })
export class IsPasswordLongEnough implements ValidatorConstraintInterface {
  async validate(password: string): Promise<boolean> {
    if (password.length < 6 && password.length != 0) return false;
    return true;
  }
}

export function PasswordLengthConstraint(
  validationOptions?: ValidationOptions
) {
  return function (
    object: LoginInput | RegisterInput | ChangePasswordInput,
    propertyName: string
  ): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPasswordLongEnough,
    });
  };
}
