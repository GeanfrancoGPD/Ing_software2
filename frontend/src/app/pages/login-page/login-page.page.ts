import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DynamicFormsComponent } from '../../components/dynamic-forms/dynamic-forms.component';
import { DynamicHeaderComponent } from 'src/app/components/dynamic-header/dynamic-header.component';
import { LoginPayload } from '../../services/auth.service';
import { AuthFacade } from '../../services/auth-facade.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
  imports: [
    CommonModule,
    IonicModule,
    DynamicFormsComponent,
    DynamicHeaderComponent,
  ],
})
export class LoginPageComponent {
  public authFacade = inject(AuthFacade);
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  inputs = [
    { name: 'email', label: 'Correo', type: 'email', validator: 'email' },
    {
      name: 'password',
      label: 'Contraseña',
      type: 'password',
      validator: 'password',
    },
  ];
  buttons = [
    { label: 'INICIAR', type: 'submit' },
    {
      label: '¿Olvidaste tu contraseña?',
      type: 'link',
      routerLink: '/forgot-password',
    },
  ];

  onSubmit(formValue: any) {
    console.log('Formulario válido, enviando...');

    const payload: LoginPayload = {
      email: formValue.email,
      password: formValue.password,
    };
    this.authFacade.login(payload);
  }
}
