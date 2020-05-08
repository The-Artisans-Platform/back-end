import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ async: true })
export class IsLastNamePresent implements ValidatorConstraintInterface {
  async validate(lastName: string): Promise<boolean> {
    if (lastName.length === 0) return false;
    return true;
  }
}

export function LastNamePresence(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsLastNamePresent,
    });
  };
}
