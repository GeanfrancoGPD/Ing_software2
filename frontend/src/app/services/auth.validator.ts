import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  email(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(control.value) ? null : { invalidEmail: true };
    };
  }

  username(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const regex = /^[a-zA-Z0-9]{4,16}$/;
      return regex.test(control.value) ? null : { invalidUsername: true };
    };
  }

  password(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
      return regex.test(control.value) ? null : { weakPassword: true };
    };
  }

  matchFields(field1: string, field2: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const value1 = group.get(field1)?.value;
      const value2 = group.get(field2)?.value;
      return value1 === value2 ? null : { fieldsNotMatch: true };
    };
  }

  verificationCode(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const regex = /^\d{6}$/;
      return regex.test(control.value) ? null : { invalidCode: true };
    };
  }

}
