import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DynamicFormsComponent } from '../../components/dynamic-forms/dynamic-forms.component';
import { DynamicHeaderComponent } from 'src/app/components/dynamic-header/dynamic-header.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  templateUrl: './sign-up-page.page.html',
  styleUrls: ['./sign-up-page.page.scss'],
  imports: [IonicModule, CommonModule, DynamicFormsComponent, DynamicHeaderComponent],
})
export class SignUpPage {
  private auth = inject(AuthService);
  private router = inject(Router);
  private toastController = inject(ToastController);
  private loadingController = inject(LoadingController);

  inputs = [
    { name: 'nombre', label: 'Nombre completo', type: 'text' },
    { name: 'email', label: 'Correo', type: 'email' },
    { name: 'password', label: 'Contraseña', type: 'password' },
  ];
  buttons = [
    { label: 'Registrarse', type: 'submit' },
    { label: '¿Ya estas registrado?', type: 'link', routerLink: '/login' }
  ];

  async onSubmit(values: any) {
    const loading = await this.loadingController.create({
      message: 'Creando cuenta...',
    });
    await loading.present();

    this.auth.register(values).subscribe({
      next: async (response) => {
        await loading.dismiss();
        if (response.success) {
          const toast = await this.toastController.create({
            message: response.message || 'Cuenta creada exitosamente',
            duration: 2000,
            color: 'success',
            position: 'top'
          });
          await toast.present();
          this.router.navigateByUrl('/login');
        } else {
          const toast = await this.toastController.create({
            message: response.message || 'Error al crear la cuenta',
            duration: 3000,
            color: 'danger',
            position: 'top'
          });
          await toast.present();
        }
      },
      error: async (error) => {
        await loading.dismiss();
        console.error('Error en registro:', error);
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
