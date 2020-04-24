import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ async: true })
export class isUsernamePresent implements ValidatorConstraintInterface {
  async validate(username: string): Promise<boolean> {
    if (username.length === 0) return false;
    return true;
  }
}

export function UsernamePresence(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: isUsernamePresent,
    });
  };
}
