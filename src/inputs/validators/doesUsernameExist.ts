import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

import { Profile } from "../../entity/Profile";

@ValidatorConstraint({ async: true })
export class IfUsernameAlreadyExistConstraint
  implements ValidatorConstraintInterface {
  async validate(username: string): Promise<boolean> {
    return Profile.findOne({ where: { username } }).then((profile) => {
      if (profile) return false;
      return true;
    });
  }
}

export function DoesUsernameAlreadyExist(
  validationOptions?: ValidationOptions
) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IfUsernameAlreadyExistConstraint,
    });
  };
}
