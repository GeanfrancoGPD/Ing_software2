import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  templateUrl: './forgot-password-page.page.html',
  styleUrls: ['./forgot-password-page.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
})
export class ForgotPasswordPage {
  private auth = inject(AuthService);
  private router = inject(Router);
  private toastController = inject(ToastController);
  private loadingController = inject(LoadingController);
  private alertController = inject(AlertController);

  email = '';

  async onRequest() {
    if (!this.email) {
      const toast = await this.toastController.create({
        message: 'Por favor ingresa tu correo electrónico',
        duration: 2000,
        color: 'warning',
        position: 'top'
      });
      await toast.present();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      const toast = await this.toastController.create({
        message: 'Por favor ingresa un correo electrónico válido',
        duration: 2000,
        color: 'warning',
        position: 'top'
      });
      await toast.present();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Enviando solicitud...',
    });
    await loading.present();

    this.auth.recoverPassword({ email: this.email }).subscribe({
      next: async (response) => {
        await loading.dismiss();
        if (response.success) {
          const alert = await this.alertController.create({
            header: 'Correo enviado',
            message: response.message || 'Se ha enviado un enlace de recuperación a tu correo electrónico',
            buttons: [{
              text: 'OK',
              handler: () => {
                this.router.navigateByUrl('/reset-password');
              }
            }]
          });
          await alert.present();
        } else {
          const toast = await this.toastController.create({
            message: response.message || 'Error al enviar el correo',
            duration: 3000,
            color: 'danger',
            position: 'top'
          });
          await toast.present();
        }
      },
      error: async (error) => {
        await loading.dismiss();
        console.error('Error al recuperar contraseña:', error);
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
