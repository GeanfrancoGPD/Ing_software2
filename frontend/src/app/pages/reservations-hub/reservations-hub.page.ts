import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CompactHeaderComponent } from '../../components/compact-header/compact-header.component';
import { DynamicCardComponent } from '../../components/dynamic-card/dynamic-card.component';

interface ReservationCard {
  title: string;
  description: string;
  dateLabel: string;
  link?: string;
}

@Component({
  selector: 'app-reservations-hub',
  standalone: true,
  templateUrl: './reservations-hub.page.html',
  styleUrls: ['./reservations-hub.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule, CompactHeaderComponent, DynamicCardComponent],
})
export class ReservationsHubPage {
  searchTerm = '';

  reservations: ReservationCard[] = [
    {
      title: 'Masaje relajante, Facial botánico, Exfoliación corporal',
      description: 'Lun, 28 Oct 2025 · 16:00',
      dateLabel: 'Lun, 28 Oct 2025 · 16:00',
    },
    {
      title: 'Weekend botánico',
      description: 'Sab, 09 Nov 2025 · 11:00',
      dateLabel: 'Sab, 09 Nov 2025 · 11:00',
    },
    {
      title: 'Baño de vapor, Exfoliación corporal, Aromaterapia',
      description: 'Lun, 24 Nov 2025 · 18:00',
      dateLabel: 'Lun, 24 Nov 2025 · 18:00',
    },
    {
      title: 'Masaje relajante, Facial botánico, Exfoliación corporal',
      description: 'Lun, 28 Oct 2025 · 16:00',
      dateLabel: 'Lun, 28 Oct 2025 · 16:00',
    },
    {
      title: 'Weekend botánico',
      description: 'Sab, 09 Nov 2025 · 11:00',
      dateLabel: 'Sab, 09 Nov 2025 · 11:00',
    },
    {
      title: 'Baño de vapor, Exfoliación corporal, Aromaterapia',
      description: 'Lun, 24 Nov 2025 · 18:00',
      dateLabel: 'Lun, 24 Nov 2025 · 18:00',
    },
    {
      title: 'Weekend botánico',
      description: 'Sab, 09 Nov 2025 · 11:00',
      dateLabel: 'Sab, 09 Nov 2025 · 11:00',
    },
    {
      title: 'Baño de vapor, Exfoliación corporal, Aromaterapia',
      description: 'Lun, 24 Nov 2025 · 18:00',
      dateLabel: 'Lun, 24 Nov 2025 · 18:00',
    },
  ];

  get filteredReservations(): ReservationCard[] {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) return this.reservations;
    return this.reservations.filter((r) =>
      `${r.title} ${r.description}`.toLowerCase().includes(term)
    );
  }

  onAddReservation() {
    // TODO: Navegar a la página para crear nueva reserva cuando exista
  }
}
