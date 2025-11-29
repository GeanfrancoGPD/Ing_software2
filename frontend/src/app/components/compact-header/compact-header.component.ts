import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-compact-header',
  standalone: true,
  templateUrl: './compact-header.component.html',
  styleUrls: ['./compact-header.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class CompactHeaderComponent {
  @Input() title: string = '';
}

