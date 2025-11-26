import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-dynamic-card',
  templateUrl: './dynamic-card.component.html',
  styleUrls: ['./dynamic-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class DynamicCardComponent implements OnInit {
  constructor() {}
  @Input() title: string = '';
  @Input() description: string = '';

  ngOnInit() {}
}
