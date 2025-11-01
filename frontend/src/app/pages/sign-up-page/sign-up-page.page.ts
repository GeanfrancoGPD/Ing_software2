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
  selector: 'app-sign-up-page',
  standalone: true,
  templateUrl: './sign-up-page.page.html',
  styleUrls: ['./sign-up-page.page.scss'],
  imports: [IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonInput, IonItem, IonLabel, IonGrid, IonRow, IonCol, CommonModule, FormsModule, RouterLink]
})
export class SignUpPageComponent {
  name = '';
  email = '';
  password = '';

  constructor() {}

  onSignUp() {
    console.log('SignUp', this.name, this.email, this.password);
  }
}

