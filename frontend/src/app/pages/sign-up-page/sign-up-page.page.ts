import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DynamicFormsComponent } from '../../components/dynamic-forms/dynamic-forms.component';
import { DynamicHeaderComponent } from 'src/app/components/dynamic-header/dynamic-header.component';
import {AuthService, LoginPayload, RegisterPayload} from '../../services/auth.service';
import { AuthFacade } from '../../services/auth-facade.service';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  templateUrl: './sign-up-page.page.html',
  styleUrls: ['./sign-up-page.page.scss'],
  imports: [IonicModule, CommonModule, DynamicFormsComponent, DynamicHeaderComponent],
})
export class SignUpPage {
  public authFacade = inject(AuthFacade);

  inputs = [
    { name: 'nombre', label: 'Nombre completo', type: 'text' },
    { name: 'email', label: 'Correo', type: 'email' },
    { name: 'password', label: 'Contraseña', type: 'password' },
  ];
  buttons = [
    { label: 'Registrarse', type: 'submit' },
    { label: '¿Ya estas registrado?', type: 'link', routerLink: '/login' }
  ];

  onSubmit(formValue: any) {
    const payload: RegisterPayload = {
      nombre: formValue.nombre,
      email: formValue.email,
      password: formValue.password,
      tipo_usuario: 2,
    };

    this.authFacade.register(payload);
  }
}
