import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dynamic-card',
  templateUrl: './dynamic-card.component.html',
  styleUrls: ['./dynamic-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class DynamicCardComponent implements OnInit {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageUrl: string = '';
  @Input() LinkUrl: string = '';

  constructor(private router: Router) {}

  ngOnInit() {}

  onCardClick() {
    if (this.LinkUrl) {
      setTimeout(() => {
        this.router.navigate([this.LinkUrl]);
      }, 1000);
    }
  }
}
