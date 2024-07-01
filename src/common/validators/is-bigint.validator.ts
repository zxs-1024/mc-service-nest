import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsBigIntConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return (
      typeof value === 'bigint' ||
      (!isNaN(value) && Number.isInteger(Number(value)))
    );
  }

  defaultMessage() {
    return 'Value ($value) is not a valid BigInt';
  }
}

export function IsBigInt(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsBigIntConstraint,
    });
  };
}
