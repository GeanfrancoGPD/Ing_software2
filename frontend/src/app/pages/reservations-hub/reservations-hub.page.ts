import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CompactHeaderComponent } from '../../components/compact-header/compact-header.component';
import { DynamicCardComponent } from '../../components/dynamic-card/dynamic-card.component';
import { ProcessPayload } from 'src/app/services/auth.service';
import { AuthFacade } from 'src/app/services/auth-facade.service';
import { inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Reservation } from 'src/app/services/reservation';
import { Router } from '@angular/router';

interface ReservationCard {
  id_reserva: number;
  title: string;
  description: string;
  dateLabel: string;
  servicioRaw: string;
  NombreCliente: string;
  NombreEmpleado: string;
}

@Component({
  selector: 'app-reservations-hub',
  standalone: true,
  templateUrl: './reservations-hub.page.html',
  styleUrls: ['./reservations-hub.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompactHeaderComponent,
    DynamicCardComponent,
  ],
  providers: [DatePipe],
})
export class ReservationsHubPage {
  public authFacade = inject(AuthFacade);
  searchTerm = '';

  constructor(
    private reservationService: Reservation,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  async ngOnInit() {
    const payload: ProcessPayload = {
      table: '',
      params: {
        nameQuery: 'getCitaById',
        queryParams: '2',
      },
      type: 'nameQuery',
    };
    try {
      const resp = await this.authFacade.toprocess(payload);
      this.cargarReservas(resp.data);
    } catch (error) {
      console.error('Error en el server', error);
    }
  }

  async cargarReservas(data: Array<any>) {
    this.reservations = [];
    for (const reserva of data) {
      const fechaISO = reserva.fecha_servicio;
      const fechaCompleta = new Date(fechaISO);
      const fecha = this.datePipe.transform(
        fechaCompleta,
        'EEE, dd MMM yyyy',
        '',
        'es'
      );
      const hora = this.datePipe.transform(fechaCompleta, 'HH:mm', '', 'es');
      console.log('fecha:', fecha, 'hora:', hora);

      this.reservations.push({
        id_reserva: reserva.id_cita,
        title: reserva.nombre_cita,
        description: `${fecha} - ${hora}`,
        dateLabel: `${fecha} - ${hora}`,
        servicioRaw: reserva.nombre_servicio,
        NombreCliente: reserva.nombre_cliente,
        NombreEmpleado: reserva.nombre_empleado,
      });
    }
  }
  reservations: ReservationCard[] = [
    //   {
    //     title: 'Masaje relajante, Facial botánico, Exfoliación corporal',
    //     description: 'Lun, 28 Oct 2025 · 16:00',
    //     dateLabel: 'Lun, 28 Oct 2025 · 16:00',
    //   },
    //   {
    //     title: 'Weekend botánico',
    //     description: 'Sab, 09 Nov 2025 · 11:00',
    //     dateLabel: 'Sab, 09 Nov 2025 · 11:00',
    //   },
    //   {
    //     title: 'Baño de vapor, Exfoliación corporal, Aromaterapia',
    //     description: 'Lun, 24 Nov 2025 · 18:00',
    //     dateLabel: 'Lun, 24 Nov 2025 · 18:00',
    //   },
    //   {
    //     title: 'Masaje relajante, Facial botánico, Exfoliación corporal',
    //     description: 'Lun, 28 Oct 2025 · 16:00',
    //     dateLabel: 'Lun, 28 Oct 2025 · 16:00',
    //   },
    //   {
    //     title: 'Weekend botánico',
    //     description: 'Sab, 09 Nov 2025 · 11:00',
    //     dateLabel: 'Sab, 09 Nov 2025 · 11:00',
    //   },
    //   {
    //     title: 'Baño de vapor, Exfoliación corporal, Aromaterapia',
    //     description: 'Lun, 24 Nov 2025 · 18:00',
    //     dateLabel: 'Lun, 24 Nov 2025 · 18:00',
    //   },
    //   {
    //     title: 'Weekend botánico',
    //     description: 'Sab, 09 Nov 2025 · 11:00',
    //     dateLabel: 'Sab, 09 Nov 2025 · 11:00',
    //   },
    //   {
    //     title: 'Baño de vapor, Exfoliación corporal, Aromaterapia',
    //     description: 'Lun, 24 Nov 2025 · 18:00',
    //     dateLabel: 'Lun, 24 Nov 2025 · 18:00',
    //   },
  ];

  get filteredReservations(): ReservationCard[] {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) return this.reservations;
    return this.reservations.filter((r) =>
      `${r.title} ${r.description}`.toLowerCase().includes(term)
    );
  }

  onReservationClick(reservaRaw: any) {
    this.reservationService.setReserva(reservaRaw);
    this.router.navigate(['/reservation-detail']);
  }

  onAddReservation() {
    // TODO: Navegar a la página para crear nueva reserva cuando exista
  }
}
