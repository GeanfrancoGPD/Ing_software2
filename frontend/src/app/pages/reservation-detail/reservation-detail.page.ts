import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Reservation } from 'src/app/services/reservation';
import { CompactHeaderComponent } from 'src/app/components/compact-header/compact-header.component';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.page.html',
  styleUrls: ['./reservation-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, CompactHeaderComponent],
})
export class ReservationDetailPage implements OnInit {
  reserva: any = null;
  constructor(private route: Router, private reservationService: Reservation) {}

  ngOnInit() {
    this.reserva = this.reservationService.getReserva();
  }

  goBack() {
    this.route.navigate(['/reservas']);
  }
}
