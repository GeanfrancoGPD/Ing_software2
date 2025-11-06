import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DinamicFormsComponent } from '../../components/dinamic-forms/dinamic-forms.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule,
    DinamicFormsComponent
  ]
})
export class LoginPageComponent {
  inputs = [
    { name: 'user', label: 'Ingrese su usuario', type: 'text'},
    { name: 'pass', label: 'Ingrese su contraseña', type: 'password' }
  ];
  buttons = [
    { type: 'submit', label: 'iniciar', fill: 'solid', class: 'button-d', position: 'center'},
    { type: 'link', label: 'No tengo cuenta', routerLink: '/sign-up', fill: 'clear'},
    // {type: 'button label: 'Iniciar con Google', action: () => this.loginWithGoogle() }
  ];

  constructor() {}

  onSubmit(values: any) {
    console.log('Valores del formulario:', values);
    // Aquí puedes hacer login con API, etc.
  }

  // loginWithGoogle() {
  //   console.log('Login con Google...');
  //   // Aquí integras Firebase Auth, Capacitor Google Auth, etc.
  // }

}

