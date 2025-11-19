import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecoverPayload } from '../../services/auth.service';
import { DynamicFormsComponent } from '../../components/dynamic-forms/dynamic-forms.component';
import { DynamicHeaderComponent } from '../../components/dynamic-header/dynamic-header.component';
import { AuthFacade } from '../../services/auth-facade.service';

@Component({
  selector: 'app-reset-password-page',
  standalone: true,
  templateUrl: './reset-password-page.page.html',
  styleUrls: ['./reset-password-page.page.scss'],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    DynamicFormsComponent,
    DynamicHeaderComponent,
  ],
})
export class ResetPasswordPage {
  public authFacade = inject(AuthFacade);

  inputs = [{ name: 'email', label: 'Correo', type: 'email' }];
  buttons = [{ label: 'Enviar Codigo', type: 'submit' }];

  onSubmit(formValue: any) {
    const payload: RecoverPayload = {
      email: formValue.email,
    };

    this.authFacade.requestPasswordReset(payload);
  }
}
