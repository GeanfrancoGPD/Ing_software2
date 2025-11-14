import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  imports: [CommonModule, IonicModule],
})
export class PrincipalPage implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  private toastController = inject(ToastController);

  data: any = null;
  loading = true;

  async ngOnInit(): Promise<void> {
    console.log('PrincipalPage - Obteniendo datos del usuario...');

    this.auth.getData().subscribe({
      next: async (res) => {
        console.log('Datos recibidos:', res);
        this.data = res;
        this.loading = false;
      },
      error: async (error) => {
        console.error('Error al obtener datos:', error);
        this.loading = false;

        const message = error.status === 401
          ? 'Sesión expirada. Por favor inicia sesión nuevamente.'
          : 'Error al cargar los datos del usuario';

        const toast = await this.toastController.create({
          message: message,
          duration: 3000,
          color: 'danger',
          position: 'top'
        });
        await toast.present();

        if (error.status === 401) {
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 1500);
        }
      },
    });
  }
}
