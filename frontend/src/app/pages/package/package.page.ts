import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProcessPayload } from 'src/app/services/auth.service';
import { AuthFacade } from 'src/app/services/auth-facade.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

interface Paquete {
  id_paquete: number;
  nombre_paquete: string;
  servicios: string[];
}

@Component({
  selector: 'app-package',
  templateUrl: './package.page.html',
  styleUrls: ['./package.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class PackagePage implements OnInit {
  public authFacade = inject(AuthFacade);
  constructor(private router: Router) {}

  paquetes: Paquete[] = [];
  async ngOnInit() {
    const payload: ProcessPayload = {
      table: '',
      params: {
        nameQuery: 'getAllPaquetes',
        queryParams: '',
      },
      type: 'nameQuery',
    };
    try {
      const resp = await this.authFacade.toprocess(payload);
      console.log(resp.data);

      this.cargarPaquete(resp.data);
    } catch (error) {
      console.error('Error en el server', error);
    }
  }

  cargarPaquete(data: Array<any>) {
    const paquetesMap = data.reduce((acc, item) => {
      const { id_paquete, nombre_paquete, nombre_servicio } = item;

      if (!acc[id_paquete]) {
        acc[id_paquete] = { id_paquete, nombre_paquete, servicios: [] };
      }

      acc[id_paquete].servicios.push(nombre_servicio);
      return acc;
    }, {} as Record<number, Paquete>);

    this.paquetes = Object.values(paquetesMap);
    console.log(this.paquetes);
  }
}
