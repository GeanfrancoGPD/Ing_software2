import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DynamicFormsComponent } from '../../components/dynamic-forms/dynamic-forms.component';
import { DynamicHeaderComponent } from 'src/app/components/dynamic-header/dynamic-header.component';
import { LoginPayload } from '../../services/auth.service';
import { AuthFacade } from '../../services/auth-facade.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
  imports: [CommonModule, IonicModule, DynamicFormsComponent, DynamicHeaderComponent],
})
export class LoginPageComponent {
  public authFacade = inject(AuthFacade);

  inputs = [
    { name: 'email', label: 'Correo', type: 'email' },
    { name: 'password', label: 'Contraseña', type: 'password' },
  ];
  buttons = [
    { label: 'INICIAR', type: 'submit' },
    { label: '¿Olvidaste tu contraseña?', type: 'link', routerLink: '/forgot-password' },
  ];

  onSubmit(formValue: any) {
    const payload: LoginPayload = {
      email: formValue.email,
      password: formValue.password,
    };

    this.authFacade.login(payload);
  }
}
