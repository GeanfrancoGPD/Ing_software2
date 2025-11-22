import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Validators } from '@angular/forms';
import { passwordComplexityValidator } from 'src/app/validator/password.validator';

@Component({
  selector: 'app-dynamic-forms',
  templateUrl: './dynamic-forms.component.html',
  styleUrls: ['./dynamic-forms.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule],
})
export class DynamicFormsComponent implements OnInit {
  @Input() inputs: any[] = [];
  @Output() formSubmit = new EventEmitter<any>();
  @Input() buttons: any[] = [];
  @Input() form!: FormGroup;

  private fb = inject(FormBuilder);
  private mensajeError: string = '';
  ngOnInit() {
    const group: any = {};
    this.inputs.forEach((input) => {
      group[input.name] = [''];
      if (input.validator) {
        switch (input.validator) {
          case 'email':
            group[input.name] = ['', [Validators.required, Validators.email]];
            break;
          case 'password':
            group[input.name] = [
              '',
              [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(20),
                passwordComplexityValidator(),
              ],
            ];
            break;
          case 'text':
            group[input.name] = [
              '',
              [
                Validators.required,
                Validators.maxLength(30),
                Validators.minLength(3),
              ],
            ];
            break;
        }
      }
    });

    this.form = this.fb.group(group);

    // Escuchar cambios en todo el formulario
    this.form.valueChanges.subscribe(() => {
      this.inputs.forEach((input) => {
        const control = this.form.get(input.name);
        if (control?.invalid && control.touched) {
          this.mensajeError = JSON.stringify(control.errors);
        } else {
          this.mensajeError = '';
        }
      });
    });
  }

  submitForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.formSubmit.emit(this.form.value);
  }

  handleButtonClick(btn: any) {
    if (btn.action) {
      btn.action();
    }
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.form.get(controlName);
    if (!control || !control.touched || !control.errors) return null;

    const e = control.errors;

    // Orden de prioridad (ajústalo según prefieras)
    // 1. required
    if (e['required']) {
      return 'Este campo es obligatorio';
    }

    // 2. spaces (si detectas espacios, puedes mostrarlo primero)
    if (e['spaces']) {
      return 'No se permiten espacios';
    }

    // 3. minlength
    if (e['minlength']) {
      const len = e['minlength'].requiredLength ?? 0;
      return `Debe tener al menos ${len} caracteres`;
    }

    // 4. maxlength
    if (e['maxlength']) {
      const len = e['maxlength'].requiredLength ?? 0;
      return `No puede superar ${len} caracteres`;
    }

    // 5. email (formato)
    if (e['email']) {
      return 'El formato del correo no es válido';
    }

    // 6. Validaciones específicas de password (uppercase, lowercase, number, symbol)
    if (e['uppercase']) {
      return 'Debe contener al menos 1 letra mayúscula';
    }
    if (e['lowercase']) {
      return 'Debe contener al menos 1 letra minúscula';
    }
    if (e['number']) {
      return 'Debe contener al menos 1 número';
    }
    if (e['symbol']) {
      return 'Debe contener al menos 1 símbolo (ej: ., $, *, @, !, etc.)';
    }

    // 7. pattern genérico u otros errores
    if (e['pattern']) {
      return 'El formato no es válido';
    }

    // 8. cualquier otro error (fallback)
    const firstKey = Object.keys(e)[0];
    if (firstKey) {
      return `Error: ${firstKey}`;
    }

    return null;
  }
}
