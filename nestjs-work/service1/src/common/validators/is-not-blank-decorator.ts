import { Validate } from 'class-validator';
import { IsNotBlankConstraint } from '../decorator/is-not-blank.validator';

export function IsNotBlank() {
  return Validate(IsNotBlankConstraint);
}
