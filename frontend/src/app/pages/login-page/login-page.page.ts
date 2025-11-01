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
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
  imports: [IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonInput, IonItem, IonLabel, IonGrid, IonRow, IonCol, CommonModule, FormsModule, RouterLink]
})
export class LoginPageComponent {
  email = '';
  password = '';

  constructor() {}

  onLogin() {
    console.log('Login', this.email, this.password);
  }
}

