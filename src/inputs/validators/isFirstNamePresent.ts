import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ async: true })
export class IsFirstNamePresent implements ValidatorConstraintInterface {
  async validate(firstName: string): Promise<boolean> {
    if (firstName.length === 0) return false;
    return true;
  }
}

export function FirstNamePresence(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsFirstNamePresent,
    });
  };
}
