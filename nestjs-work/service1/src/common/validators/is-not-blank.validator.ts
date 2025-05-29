import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNotBlank', async: false })
export class IsNotBlankConstraint implements ValidatorConstraintInterface {
  validate(value: string, _args: ValidationArguments): boolean {
    return typeof value === 'string' && value.length > 0;
  }

  defaultMessage(_args: ValidationArguments): string {
    return 'This field must not be empty or contain only whitespace';
  }
}
