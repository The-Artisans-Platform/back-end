import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ async: true })
export class IsEmailPresent implements ValidatorConstraintInterface {
  async validate(email: string): Promise<boolean> {
    if (email.length === 0) return false;
    return true;
  }
}

export function EmailPresence(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailPresent,
    });
  };
}
