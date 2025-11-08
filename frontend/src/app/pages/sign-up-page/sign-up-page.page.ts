import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DynamicFormsComponent } from '../../components/dynamic-forms/dynamic-forms.component';
import { DynamicHeaderComponent } from 'src/app/components/dynamic-header/dynamic-header.component';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  templateUrl: './sign-up-page.page.html',
  styleUrls: ['./sign-up-page.page.scss'],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DynamicHeaderComponent,
    DynamicFormsComponent,
  ],
})
export class SignUpPageComponent {
  inputs = [
    { name: 'user', label: 'Ingrese su usuario', type: 'text' },
    { name: 'email', label: 'Ingrese su correo electrónico', type: 'email' },
    { name: 'pass', label: 'Confirme su contraseña', type: 'password' },
  ];
  buttons = [
    {
      type: 'submit',
      label: 'Registrarse',
      fill: 'solid',
      class: 'button-d',
      position: 'center',
    },
    {
      type: 'link',
      label: 'Ya tengo cuenta',
      routerLink: '/login',
      fill: 'clear',
    },
    // {type: 'button label: 'Iniciar con Google', action: () => this.loginWithGoogle() }
  ];

  constructor() {}

  onSubmit(values: any) {
    console.log('Valores del formulario:', values);
    // Aquí puedes hacer login con API, etc.
  }
}
