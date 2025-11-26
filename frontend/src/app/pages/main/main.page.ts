import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService, LoginPayload } from '../../services/auth.service';
import { DynamicFormsComponent } from '../../components/dynamic-forms/dynamic-forms.component';
import { AuthFacade } from '../../services/auth-facade.service';
import { DynamicCardComponent } from 'src/app/components/dynamic-card/dynamic-card.component';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  imports: [
    CommonModule,
    IonicModule,
    DynamicFormsComponent,
    DynamicCardComponent,
  ],
})
export class MainPage implements OnInit {
  private auth = inject(AuthService);
  private toastController = inject(ToastController);
  public authFacade = inject(AuthFacade);

  buttons = [{ label: 'Cerrar Sesion', type: 'submit' }];

  loading = true;
  data: any = null;

  ngOnInit(): void {
    this.cargarDatos();
  }

  private cargarDatos(): void {
    this.loading = true;

    this.auth.getData().subscribe({
      next: async (user) => {
        this.data = user;
        this.loading = false;
      },
      error: async (error) => {
        console.error('Error al cargar datos del usuario:', error);
        this.loading = false;

        const toast = await this.toastController.create({
          message: 'No se pudieron cargar los datos del usuario.',
          duration: 3000,
          color: 'danger',
          position: 'top',
        });
        await toast.present();
      },
    });
  }
  onSubmit() {
    this.authFacade.logout();
  }
}
