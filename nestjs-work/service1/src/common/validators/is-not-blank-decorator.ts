import { Validate } from 'class-validator';
import { IsNotBlankConstraint } from './is-not-blank.validator';

export function IsNotBlank() {
  return Validate(IsNotBlankConstraint);
}
