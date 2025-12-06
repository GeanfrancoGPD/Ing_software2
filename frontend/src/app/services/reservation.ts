import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Reservation {
  private reservaSeleccionada: any = null;

  setReserva(reserva: any) {
    this.reservaSeleccionada = reserva;
  }

  getReserva() {
    return this.reservaSeleccionada;
  }
}
