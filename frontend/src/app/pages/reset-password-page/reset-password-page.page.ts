import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password-page',
  standalone: true,
  templateUrl: './reset-password-page.page.html',
  styleUrls: ['./reset-password-page.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
})
export class ResetPasswordPage {
  private auth = inject(AuthService);
  private router = inject(Router);
  private toastController = inject(ToastController);
  private loadingController = inject(LoadingController);
  private alertController = inject(AlertController);

  email = '';
  password = '';
  confirmPassword = '';

  async onReset() {
    // Validación
    if (!this.email || !this.password || !this.confirmPassword) {
      const toast = await this.toastController.create({
        message: 'Todos los campos son requeridos',
        duration: 2000,
        color: 'warning',
        position: 'top'
      });
      await toast.present();
      return;
    }

    if (this.password !== this.confirmPassword) {
      const toast = await this.toastController.create({
        message: 'Las contraseñas no coinciden',
        duration: 2000,
        color: 'warning',
        position: 'top'
      });
      await toast.present();
      return;
    }

    if (this.password.length < 6) {
      const toast = await this.toastController.create({
        message: 'La contraseña debe tener al menos 6 caracteres',
        duration: 2000,
        color: 'warning',
        position: 'top'
      });
      await toast.present();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Restableciendo contraseña...',
    });
    await loading.present();

    this.auth.resetPassword({ email: this.email, password: this.password }).subscribe({
      next: async (response) => {
        await loading.dismiss();
        if (response.success) {
          const alert = await this.alertController.create({
            header: 'Éxito',
            message: response.message || 'Contraseña restablecida exitosamente',
            buttons: [{
              text: 'Enviar',
              handler: () => {
                this.router.navigateByUrl('/login');
              }
            }]
          });
          await alert.present();
        } else {
          const toast = await this.toastController.create({
            message: response.message || 'Error al restablecer la contraseña',
            duration: 3000,
            color: 'danger',
            position: 'top'
          });
          await toast.present();
        }
      },
      error: async (error) => {
        await loading.dismiss();
        console.error('Error al restablecer contraseña:', error);
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
