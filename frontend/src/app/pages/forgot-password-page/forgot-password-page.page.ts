import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ResetPayload } from '../../services/auth.service';
import {AuthFacade} from "../../services/auth-facade.service";
import {DynamicFormsComponent} from "../../components/dynamic-forms/dynamic-forms.component";
import {DynamicHeaderComponent} from "../../components/dynamic-header/dynamic-header.component";

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  templateUrl: './forgot-password-page.page.html',
  styleUrls: ['./forgot-password-page.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule, DynamicFormsComponent, DynamicHeaderComponent],
})
export class ForgotPasswordPage {
  public authFacade = inject(AuthFacade);

  inputs = [
    { name: 'email', label: 'Correo', type: 'email' },
    { name: 'password', label: 'Nueva contraseña', type: 'password' },
    { name: 'repeat_password', label: 'Confirmar contraseña', type: 'password' }
  ];
  buttons = [
    { label: 'Restablecer', type: 'submit' },
  ];

  onSubmit(formValue: any) {
    const payload: ResetPayload = {
      email: formValue.email,
      password: formValue.password
    };

    this.authFacade.resetPassword(payload);
  }
}
