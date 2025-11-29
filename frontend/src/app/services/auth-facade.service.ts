import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import {
  AuthService,
  LoginPayload,
  RecoverPayload,
  RegisterPayload,
  ResetPayload,
  ProcessPayload,
} from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private auth = inject(AuthService);
  private router = inject(Router);
  private toastController = inject(ToastController);
  private loadingController = inject(LoadingController);

  async toprocess(
    payload: ProcessPayload,
    redirectTo: string = '/citas'
  ): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Procesando...',
    });
    await loading.present();

    this.auth.toProcess(payload).subscribe({
      next: async () => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Proceso completado exitosamente',
          duration: 2000,
          color: 'success',
          position: 'top',
        });
        await toast.present();
        this.router.navigateByUrl(redirectTo);
      },
      error: async (error) => {
        await loading.dismiss();
        const message =
          error.error?.message || 'Error al conectar con el servidor';
        const toast = await this.toastController.create({
          message,
          duration: 3000,
          color: 'danger',
          position: 'top',
        });
        await toast.present();
      },
    });
  }

  async login(
    payload: LoginPayload,
    redirectTo: string = '/main'
  ): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
    });
    await loading.present();

    this.auth.login(payload).subscribe({
      next: async () => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Inicio de sesión exitoso',
          duration: 2000,
          color: 'success',
          position: 'top',
        });
        await toast.present();
        this.router.navigateByUrl(redirectTo);
      },
      error: async (error) => {
        await loading.dismiss();
        const message =
          error.error?.message || 'Error al conectar con el servidor';
        const toast = await this.toastController.create({
          message,
          duration: 3000,
          color: 'danger',
          position: 'top',
        });
        await toast.present();
      },
    });
  }

  async register(
    payload: RegisterPayload,
    redirectTo: string = '/login'
  ): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Registrando usuario...',
    });
    await loading.present();

    this.auth.register(payload).subscribe({
      next: async () => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Registro exitoso',
          duration: 2000,
          color: 'success',
          position: 'top',
        });
        await toast.present();
        this.router.navigateByUrl(redirectTo);
      },
      error: async (error) => {
        await loading.dismiss();
        const message =
          error.error?.message || 'Error al conectar con el servidor';
        const toast = await this.toastController.create({
          message,
          duration: 3000,
          color: 'danger',
          position: 'top',
        });
        await toast.present();
      },
    });
  }

  async requestPasswordReset(
    payload: RecoverPayload,
    redirectTo: string = '/reset-password'
  ): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Enviando solicitud...',
    });

    await loading.present();

    this.auth.recoverPassword(payload).subscribe({
      next: async (response: any) => {
        await loading.dismiss();

        const toast = await this.toastController.create({
          header: 'Correo enviado',
          message:
            response.message ||
            'Se ha enviado un enlace o código de recuperación a tu correo electrónico.',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.router.navigateByUrl(redirectTo);
              },
            },
          ],
        });
        await toast.present();
      },

      error: async (error) => {
        await loading.dismiss();
        const message =
          error.error?.message || 'Error al conectar con el servidor';
        const toast = await this.toastController.create({
          message,
          duration: 3000,
          color: 'danger',
          position: 'top',
        });
        await toast.present();
      },
    });
  }

  async resetPassword(
    payload: ResetPayload,
    redirectTo: string = '/login'
  ): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Restableciendo contraseña...',
    });

    this.auth.resetPassword(payload).subscribe({
      next: async () => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          header: 'Contraseña actualizada',
          message: 'Tu contraseña ha sido restablecida exitosamente.',
          duration: 2000,
          color: 'success',
          position: 'top',
        });
        await toast.present();
        this.router.navigateByUrl(redirectTo);
      },
      error: async (error) => {
        await loading.dismiss();
        const message =
          error.error?.message || 'No se pudo restablecer la contraseña';
        const toast = await this.toastController.create({
          message,
          duration: 3000,
          color: 'danger',
          position: 'top',
        });
        await toast.present();
      },
    });
  }

  async logout(redirectTo: string = '/login'): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Cerrando sesión...',
    });

    this.auth.logout().subscribe({
      next: async () => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Sesión cerrada correctamente.',
          duration: 2000,
          color: 'success',
          position: 'top',
        });
        await toast.present();
        this.router.navigateByUrl(redirectTo);
      },
      error: async (error) => {
        await loading.dismiss();
        const message =
          error.error?.message || 'Error al cerrar sesión: ' + error;
        const toast = await this.toastController.create({
          message,
          duration: 3000,
          color: 'danger',
          position: 'top',
        });
        await toast.present();
      },
    });
  }
}
