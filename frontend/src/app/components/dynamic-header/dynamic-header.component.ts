import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-dynamic-header',
  templateUrl: './dynamic-header.component.html',
  styleUrls: ['./dynamic-header.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class DynamicHeaderComponent implements OnInit {
  @Input() title: string = '';
  constructor() {}

  ngOnInit() {}
}
