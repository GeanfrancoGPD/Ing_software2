import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordComplexityValidator(
  allowedSymbols?: string | RegExp
): ValidatorFn {
  const symbolRegex = allowedSymbols
    ? typeof allowedSymbols === 'string'
      ? new RegExp(
          '[' + allowedSymbols.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + ']'
        )
      : allowedSymbols
    : /[!@#\$%\^&\*\.\,\-\+\=\?\/\\\(\)\[\]\{\}<>:;~`|]/; // por defecto

  const upperRegex = /[A-Z]/;
  const lowerRegex = /[a-z]/;
  const numberRegex = /\d/;
  const spacesRegex = /\s/;

  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value ?? '';

    if (value.length === 0) return null; // required se maneja por otro validator

    const errors: ValidationErrors = {};

    if (!upperRegex.test(value)) errors['uppercase'] = true;
    if (!lowerRegex.test(value)) errors['lowercase'] = true;
    if (!numberRegex.test(value)) errors['number'] = true;
    if (!symbolRegex.test(value)) errors['symbol'] = true;
    if (spacesRegex.test(value)) errors['spaces'] = true;

    return Object.keys(errors).length ? errors : null;
  };
}
