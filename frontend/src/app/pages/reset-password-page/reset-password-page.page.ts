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
  selector: 'app-reset-password-page',
  standalone: true,
  templateUrl: './reset-password-page.page.html',
  styleUrls: ['./reset-password-page.page.scss'],
  imports: [IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonInput, IonItem, IonLabel, IonGrid, IonRow, IonCol, CommonModule, FormsModule]
})
export class ResetPasswordPage {
  password = '';
  confirm = '';

  constructor() {}

  onReset() {
    if (this.password !== this.confirm) {
      console.warn('Las contraseñas no coinciden');
      return;
    }
    console.log('Contraseña restablecida a', this.password);
  }
}
