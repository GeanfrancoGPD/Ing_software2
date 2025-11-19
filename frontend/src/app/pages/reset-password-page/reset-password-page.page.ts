import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DynamicFormsComponent } from '../../components/dynamic-forms/dynamic-forms.component';
import { DynamicHeaderComponent } from 'src/app/components/dynamic-header/dynamic-header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-password-page',
  standalone: true,
  templateUrl: './reset-password-page.page.html',
  styleUrls: ['./reset-password-page.page.scss'],
  imports: [
    DynamicFormsComponent,
    DynamicHeaderComponent,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterLink,
  ],
})
export class ResetPasswordPage {
  inputs = [
    { name: 'newPassword', label: 'Contraseña nueva', type: 'password' },
    {
      name: 'confirmPassword',
      label: 'Confirme su contraseña',
      type: 'password',
    },
  ];
  buttons = [
    {
      type: 'submit',
      label: 'Confirmar',
      fill: 'solid',
      class: 'button-d',
      position: 'center',
    },
  ];

  constructor() {}

  onSubmit(values: any) {
    console.log('Valores del formulario:', values);
    // Aquí puedes hacer login con API, etc.
  }
}
