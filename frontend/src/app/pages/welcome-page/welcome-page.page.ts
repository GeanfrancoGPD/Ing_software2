import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  templateUrl: './welcome-page.page.html',
  styleUrls: ['./welcome-page.page.scss'],
  imports: [IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonGrid, IonRow, IonCol, CommonModule, FormsModule]
})
export class WelcomePage {
  constructor() {}
}

