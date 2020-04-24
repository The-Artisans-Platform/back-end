import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ async: true })
export class IsPasswordLongEnough implements ValidatorConstraintInterface {
  async validate(password: string): Promise<boolean> {
    if (password.length < 6) return false;
    return true;
  }
}

export function PasswordLength(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPasswordLongEnough,
    });
  };
}
