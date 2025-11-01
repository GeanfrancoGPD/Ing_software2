import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-verification-code-page',
  standalone: true,
  templateUrl: './verification-code-page.page.html',
  styleUrls: ['./verification-code-page.page.scss'],
  imports: [IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonInput, IonItem, IonLabel, IonGrid, IonRow, IonCol, CommonModule, FormsModule]
})
export class VerificationCodePage {
  code = '';

  constructor() {}

  onVerify() {
    console.log('Verifying code', this.code);
  }
}

