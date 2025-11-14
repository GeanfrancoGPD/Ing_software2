import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DynamicFormsComponent } from '../../components/dynamic-forms/dynamic-forms.component';
import { DynamicHeaderComponent } from 'src/app/components/dynamic-header/dynamic-header.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
  imports: [CommonModule, IonicModule, DynamicFormsComponent, DynamicHeaderComponent],
})
export class LoginPageComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private toastController = inject(ToastController);
  private loadingController = inject(LoadingController);

  inputs = [
    { name: 'email', label: 'Correo', type: 'email' },
    { name: 'password', label: 'Contraseña', type: 'password' },
  ];
  buttons = [
    { label: 'INICIAR', type: 'submit' },
    { label: '¿Olvidaste tu contraseña?', type: 'link', routerLink: '/forgot-password' },
  ];

  async onSubmit(values: any) {
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
    });
    await loading.present();

    this.auth.login(values).subscribe({
      next: async (response) => {
        await loading.dismiss();
        if (response.success) {
          const toast = await this.toastController.create({
            message: 'Inicio de sesión exitoso',
            duration: 2000,
            color: 'success',
            position: 'top'
          });
          await toast.present();
          this.router.navigateByUrl('/principal');
        } else {
          const toast = await this.toastController.create({
            message: response.message || 'Error al iniciar sesión',
            duration: 3000,
            color: 'danger',
            position: 'top'
          });
          await toast.present();
        }
      },
      error: async (error) => {
        await loading.dismiss();
        console.error('Error en login:', error);
        const message = error.error?.message || 'Error al conectar con el servidor';
        const toast = await this.toastController.create({
          message: message,
          duration: 3000,
          color: 'danger',
          position: 'top'
        });
        await toast.present();
      },
    });
  }
}
