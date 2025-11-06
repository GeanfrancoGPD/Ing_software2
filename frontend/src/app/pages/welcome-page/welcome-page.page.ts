import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  templateUrl: './welcome-page.page.html',
  styleUrls: ['./welcome-page.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule, RouterLink]
})
export class WelcomePage {
  constructor() {}
}

